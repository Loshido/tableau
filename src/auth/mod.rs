use anyhow::{Result, anyhow};
use openid::{Claims, Client, Discovered, Options};
use reqwest::Url;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tracing::{Level, event};

use crate::db;

mod state;

const GOOGLE_OIDC_ISSUER: &str = "https://accounts.google.com";

/// client OIDC configuré pour Google
#[derive(Clone)]
pub struct OidcClient(Arc<Client<Discovered>>);

impl OidcClient {
    /// configure un nouveau client en découvrant les métadonnées OIDC de Google.
    pub async fn new(client_id: String, client_secret: String, redirect_url: &str) -> Result<Self> {
        // vérification du lien de redirection.
        let _ = Url::parse(redirect_url)?;
        let issuer = Url::parse(GOOGLE_OIDC_ISSUER)?;

        event!(
            Level::DEBUG,
            "oidc client discovery for client_id {} at {}",
            client_id,
            issuer
        );

        // découverte de la configuration de l'autorité.
        let client = Client::<Discovered>::discover(
            client_id,
            Some(client_secret),
            Some(redirect_url.to_string()),
            issuer,
        )
        .await?;

        Ok(Self(Arc::new(client)))
    }

    /// génère le lien de redirection vers Google, en enregistrant au
    /// préalable un `state` et un `nonce` associés pour la vérification
    /// ultérieure du callback.
    pub async fn authorization_url(&self, mut conn: db::Conn) -> Result<String> {
        let (state, nonce) = state::register_state(&mut conn).await?;

        event!(
            Level::DEBUG,
            "redirecting to google with registered state ({}) and nonce",
            state
        );

        let options = Options {
            nonce: Some(nonce),
            state: Some(state),
            scope: Some("openid email profile".to_string()),
            ..Default::default()
        };

        Ok(self.0.auth_url(&options).to_string())
    }

    /// échange le code d'autorisation contre un token, valide l'ID token
    /// reçu (signature + nonce), puis retourne les informations utilisateur
    /// ainsi que les données de session à persister.
    pub async fn exchange_code(
        &self,
        code: String,
        state: String,
        mut conn: db::Conn,
    ) -> Result<(UserInfo, SessionData)> {
        event!(
            Level::DEBUG,
            "attempt to exchange code with state = {}",
            state
        );

        let (bearer, nonce) = tokio::join!(
            self.0.request_token(&code),
            state::check_state(&mut conn, &state)
        );

        let bearer = bearer?;
        let nonce = nonce?.ok_or_else(|| anyhow!("attempt to verify not registered"))?;

        let id_token_str = bearer
            .id_token
            .ok_or_else(|| anyhow!("no id_token in response"))?;

        // Crée un IdToken (Jws<StandardClaims>) à partir de la chaîne encodée.
        let mut id_token = openid::IdToken::new_encoded(&id_token_str);

        // Décode la signature du JWT.
        self.0.decode_token(&mut id_token)?;

        // Valide le token par rapport aux données connues (dont le nonce).
        self.0
            .validate_token(&id_token, Some(nonce.as_str()), None)?;

        event!(
            Level::DEBUG,
            "attempt to exchange code with state = {} succeed",
            state
        );

        state::remove_state(&mut conn, &state).await?;

        // Extrait les claims du token validé.
        let claims = id_token.payload()?;
        let userinfo = claims.userinfo();

        let user_info = UserInfo {
            sub: claims.sub().to_string(),
            email: userinfo.email.clone(),
            name: userinfo.name.clone(),
            picture: userinfo.picture.clone().map(|u| u.to_string()),
        };

        let session_data = SessionData {
            access_token: bearer.access_token.clone(),
            refresh_token: bearer.refresh_token.clone(),
            expires_in: bearer.expires_in,
        };

        Ok((user_info, session_data))
    }
}

/// Informations utilisateur extraites de l'ID token.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    /// Identifiant Google unique de l'utilisateur.
    pub sub: String,
    pub email: Option<String>,
    pub name: Option<String>,
    pub picture: Option<String>,
}

/// Données de session à stocker en base de données.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionData {
    pub access_token: String,
    pub refresh_token: Option<String>,
    pub expires_in: Option<u64>,
}
