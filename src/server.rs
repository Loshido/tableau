use anyhow::{Context, Result};
use tokio::net::TcpListener;
use tracing::{Level, event, subscriber};

pub async fn serve(router: axum::Router) -> Result<()> {
    let listener = TcpListener::bind("0.0.0.0:80").await?;

    event!(Level::INFO, "Listening at http://localhost:80");

    axum::serve(listener, router)
        .await
        .context("failed to serve the app")
}

pub fn setup_trace() -> Result<()> {
    let logs = tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .with_ansi(true)
        .compact()
        .finish();

    Ok(subscriber::set_global_default(logs)?)
}
