use super::random_string;
use crate::db;
use anyhow::Result;
use redis::{AsyncTypedCommands, HashFieldExpirationOptions, SetExpiry};

// state expires after 5 minutes
const STATE_EXPIRATION: u64 = 60 * 5;

/// generates nonce and state, registers them on db and returns them
pub async fn register_state(conn: &mut db::Conn) -> Result<(String, String)> {
    let nonce = random_string(None);
    let state = random_string(None);

    let expirations_options =
        HashFieldExpirationOptions::default().set_expiration(SetExpiry::EX(STATE_EXPIRATION));

    conn.hset_ex("auth-flow", &expirations_options, &[(&state, &nonce)])
        .await?;

    Ok((state, nonce))
}

/// checks for a nonce given a state
pub async fn check_state(conn: &mut db::Conn, state: &String) -> Result<Option<String>> {
    let nonce = conn.hget("auth-flow", state).await?;

    Ok(nonce)
}

/// removes a given state-nonce pair
pub async fn remove_state(conn: &mut db::Conn, state: &String) -> Result<()> {
    conn.hdel("auth-flow", state).await?;

    Ok(())
}
