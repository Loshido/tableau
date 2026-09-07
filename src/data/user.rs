use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct User {
    pub email: String,
    pub sub: String,
    pub first_name: String,
    pub last_name: String,

    // picture href
    pub picture: Option<String>,
}

impl User {
    // create a new user and store it
    pub async fn create(conn: &mut db::Conn, user: User) -> Result<String> {
        let key = format!("user:{}", &user.email);
        let serialized = serde_json::to_string(&user)?;

        conn.set(&key, serialized).await?;
        Ok(user.email)
    }

    // retrieve a user by id
    pub async fn get(conn: &mut db::Conn, user_id: &str) -> Result<Option<User>> {
        let key = format!("user:{}", user_id);
        let data: Option<String> = conn.get(&key).await?;

        Ok(data.and_then(|d| serde_json::from_str(&d).ok()))
    }

    // update an existing user
    pub async fn update(conn: &mut db::Conn, user_id: &str, user: User) -> Result<()> {
        let key = format!("user:{}", user_id);
        let serialized = serde_json::to_string(&user)?;

        conn.set(&key, serialized).await?;
        Ok(())
    }

    // delete a user by ID
    pub async fn delete(conn: &mut db::Conn, user_id: &str) -> Result<()> {
        let key = format!("user:{}", user_id);
        conn.del(&key).await?;
        Ok(())
    }

    // list all users
    pub async fn list(conn: &mut db::Conn) -> Result<Vec<(String, User)>> {
        let keys: Vec<String> = conn.keys("user:*").await?;
        let mut users = Vec::new();

        for key in keys {
            if let Some(data) = conn.get(&key).await? {
                if let Ok(user) = serde_json::from_str::<User>(&data) {
                    let user_id = key.strip_prefix("user:").unwrap_or("").to_string();
                    users.push((user_id, user));
                }
            }
        }

        Ok(users)
    }
}
