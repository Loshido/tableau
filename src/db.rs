use anyhow::{Context, Result};
use redis::aio::ConnectionManager;
use std::env;

pub type Conn = ConnectionManager;
pub async fn new() -> Result<ConnectionManager> {
    let db_string = env::var("DB_STRING").unwrap_or("redis://127.0.0.1".to_string());
    let client = redis::Client::open(db_string)?;

    Ok(client
        .get_connection_manager()
        .await
        .context("database instance unreachable")?)
}
