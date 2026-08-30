use anyhow::{Context, Result};
use axum::routing::get;

mod api;
pub mod auth;
mod db;
mod server;

extern crate tracing;

#[derive(Clone)]
#[allow(unused)]
pub struct SharedHandle {
    db: db::Conn,
    oidc: auth::OidcClient,
}

#[tokio::main]
async fn main() -> Result<()> {
    server::setup_trace()?;

    let client_id = std::env::var("GOOGLE_SSO_ID").context("GOOGLE_SSO_ID has not been setup")?;
    let client_secret =
        std::env::var("GOOGLE_SSO_SECRET").context("GOOGLE_SSO_SECRET has not been setup")?;

    let shared_state = SharedHandle {
        db: db::new().await?,
        oidc: auth::OidcClient::new(client_id, client_secret, "http://localhost/auth/verify")
            .await?,
    };

    let router = axum::Router::new()
        .route("/auth/google", get(api::redirect))
        .route("/auth/verify", get(api::verify))
        .with_state(shared_state);

    server::serve(router).await
}
