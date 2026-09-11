use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Organisation {
    pub name: String,
    pub description: String,
    // additional css href
    pub src_css: Option<String>,
    // additional html href
    pub src_page: Option<String>,
}

impl Organisation {
    /// creates or overwrite a new org and store it
    pub async fn set(conn: &mut db::Conn, org_id: &str, org: Organisation) -> Result<String> {
        let key = format!("org:{}", org_id);
        let serialized = serde_json::to_string(&org)?;

        conn.set(&key, serialized).await?;
        Ok(org.name)
    }

    /// retrieves an org by id
    pub async fn get(conn: &mut db::Conn, org_id: &str) -> Result<Option<Organisation>> {
        let key = format!("org:{}", org_id);
        let data: Option<String> = conn.get(&key).await?;

        Ok(data.and_then(|d| serde_json::from_str(&d).ok()))
    }

    /// deletes an org by id
    pub async fn delete(conn: &mut db::Conn, org_id: &str) -> Result<()> {
        let key = format!("org:{}", org_id);
        conn.del(&key).await?;
        Ok(())
    }

    /// lists all orgs
    pub async fn list(conn: &mut db::Conn) -> Result<Vec<(String, Organisation)>> {
        let keys: Vec<String> = conn.keys("org:*").await?;
        let mut orgs = Vec::new();

        for key in keys {
            let org = conn
                .get(&key)
                .await?
                .and_then(|data| Some(serde_json::from_str::<Organisation>(&data)));

            match org {
                Some(Ok(org)) => {
                    let org_id = key.strip_prefix("org:").unwrap_or("").to_string();
                    orgs.push((org_id, org));
                }
                _ => {}
            }
        }

        Ok(orgs)
    }
}
