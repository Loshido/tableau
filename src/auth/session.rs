use crate::auth::oidc::SessionData;
use crate::auth::rand::random_string;
use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;

pub async fn new_session(data: &SessionData, conn: &mut db::Conn) -> Result<String> {
    // checks with identity provider whether data.access_token is still valid
    // we assume it is since this project is very young and doesn't need extra security

    let session = random_string(Some(32));
    conn.hset("auth-session", &session, &data.email).await?;

    Ok(session)
}

pub async fn check_session(session: &str, conn: &mut db::Conn) -> Result<Option<String>> {
    // checks with identity provider whether data.access_token is still valid
    // we assume it is since this project is very young and doesn't need extra security

    let email = conn.hget("auth-session", session).await?;

    Ok(email)
}
