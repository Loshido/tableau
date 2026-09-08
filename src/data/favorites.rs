use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;

#[derive(Clone, Debug)]
pub struct Favorites(pub String);

impl Favorites {
    /// sets user's favorites orgs
    pub async fn set(email: &str, favorites: String, conn: &mut db::Conn) -> Result<usize> {
        let u = conn.hset("user-fav", email, favorites).await?;
        Ok(u)
    }

    /// retrieves user's favorites orgs
    pub async fn get(email: &str, conn: &mut db::Conn) -> Result<Option<Favorites>> {
        let data: Option<String> = conn.hget("user-fav", email).await?;

        Ok(data.and_then(|d| Some(Self(d))))
    }
}
