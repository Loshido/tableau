use crate::auth::oidc::SessionData;
use crate::auth::random_string;
use crate::db;
use anyhow::Result;
use redis::{AsyncTypedCommands, HashFieldExpirationOptions};

const SESSION_TTL: u64 = 3600; // secs

/// creates a new session given a session data
pub async fn new_session(data: &SessionData, conn: &mut db::Conn) -> Result<String> {
    // checks with identity provider whether data.access_token is still valid
    // we assume it is since this project is very young and doesn't need extra security

    let session = random_string(Some(32));
    let set_ex = redis::SetExpiry::EX(SESSION_TTL);
    let ex = HashFieldExpirationOptions::default().set_expiration(set_ex);
    conn.hset_ex("auth-session", &ex, &[(&session, &data.email)])
        .await?;

    Ok(session)
}

/// checks if a session exists returning session's email
pub async fn check_session(session: &str, conn: &mut db::Conn) -> Result<Option<String>> {
    // checks with identity provider whether data.access_token is still valid
    // we assume it is since this project is very young and doesn't need extra security

    let email = conn.hget("auth-session", session).await?;

    Ok(email)
}
