use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::Redirect,
};
use axum_extra::extract::CookieJar;
use serde::Deserialize;
use tracing::{Level, event};

use crate::{SharedHandle, auth, data};

mod cookies;
mod register;

/// redirects to identity provider with a state and configured settings
/// if authentificated redirects to dashboard
pub async fn redirect(
    State(mut handle): State<SharedHandle>,
    cookies: CookieJar,
) -> Result<Redirect, (StatusCode, String)> {
    if let Some(cookie) = cookies.get("session") {
        let check = auth::session::check_session(cookie.value(), &mut handle.db)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

        if let Some(_email) = check {
            return Ok(Redirect::to("/dash/discover"));
        }
    }

    match handle.oidc.authorization_url(&mut handle.db).await {
        Ok(redirection_url) => Ok(Redirect::to(&redirection_url)),
        Err(e) => Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string())),
    }
}

#[derive(Deserialize)]
pub struct VerifyQuery {
    code: String,
    state: String,
}

/// callback for the identity provider, takes a code and state as input
/// and returns a cookie session and redirection or an error
pub async fn verify(
    State(mut handle): State<SharedHandle>,
    Query(params): Query<VerifyQuery>,
) -> Result<(CookieJar, Redirect), (StatusCode, String)> {
    let session_data = handle
        .oidc
        .exchange_code(params.code, params.state, &mut handle.db)
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    event!(
        Level::DEBUG,
        "user {} logged using oidc with sub = {}",
        &session_data.email,
        &session_data.sub
    );

    let (session, favorites) = {
        let mut conn = handle.db.clone();
        let (session, favorites) = tokio::join!(
            auth::session::new_session(&session_data, &mut conn),
            data::Favorites::get(&session_data.email, &mut handle.db)
        );

        (
            session.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?,
            favorites.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?,
        )
    };

    let _user = register::register_user(session_data, &mut handle.db).await?;
    let cookies = cookies::set(session);

    let redirection = match favorites {
        Some(_favorites) => Redirect::to("/dash/discover"),
        None => Redirect::to("/boarding/associations"),
    };

    Ok((cookies, redirection))
}
