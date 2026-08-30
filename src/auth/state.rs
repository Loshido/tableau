use anyhow::Result;
use base64::{Engine as _, engine::general_purpose};
use rand::fill;
use redis::{AsyncTypedCommands, HashFieldExpirationOptions, SetExpiry};

use crate::db;

fn random_string() -> String {
    let mut bytes = [0u8; 32];
    fill(&mut bytes);

    general_purpose::URL_SAFE_NO_PAD.encode(bytes)
}

// state expires after 5 minutes
const STATE_EXPIRATION: u64 = 60 * 5;

// generate nonce and state, register them on db and return them
pub async fn register_state(conn: &mut db::Conn) -> Result<(String, String)> {
    let nonce = random_string();
    let state = random_string();

    let expirations_options =
        HashFieldExpirationOptions::default().set_expiration(SetExpiry::EX(STATE_EXPIRATION));

    conn.hset_ex("auth-flow", &expirations_options, &[(&state, &nonce)])
        .await?;

    Ok((state, nonce))
}

pub async fn check_state(conn: &mut db::Conn, state: &String) -> Result<Option<String>> {
    let nonce = conn.hget("auth-flow", state).await?;

    Ok(nonce)
}

pub async fn remove_state(conn: &mut db::Conn, state: &String) -> Result<()> {
    conn.hdel("auth-flow", state).await?;

    Ok(())
}
