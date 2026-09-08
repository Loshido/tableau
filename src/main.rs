use anyhow::{Context, Result};

mod api;
pub mod auth;
pub mod data;
mod db;
mod server;
mod web;

#[derive(Clone)]
#[allow(unused)]
pub struct SharedHandle {
    db: db::Conn,
    oidc: auth::oidc::OidcClient,
}

#[tokio::main]
async fn main() -> Result<()> {
    server::setup_trace()?;

    let client_id = std::env::var("GOOGLE_SSO_ID").context("GOOGLE_SSO_ID has not been setup")?;
    let client_secret =
        std::env::var("GOOGLE_SSO_SECRET").context("GOOGLE_SSO_SECRET has not been setup")?;

    let shared_state = SharedHandle {
        db: db::new().await?,
        oidc: auth::oidc::OidcClient::new(client_id, client_secret, "http://localhost/auth/verify")
            .await?,
    };

    let router = axum::Router::new()
        .nest("/auth", api::auth::routes())
        .with_state(shared_state)
        .fallback_service(web::web_service());

    server::serve(router).await
}
