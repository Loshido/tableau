use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;

#[derive(Clone, Debug)]
pub struct Operators;
pub enum OperatorLevel {
    /// Able to scan tickets and list events of its org
    L1,
    /// L1 + able to create events in its org
    L2,
    /// L2 + able to manage org's operators + org's page
    L3,
}

impl OperatorLevel {
    fn parse(s: &str) -> Option<Self> {
        match s {
            "1" => Some(Self::L1),
            "2" => Some(Self::L2),
            "3" => Some(Self::L3),
            _ => None,
        }
    }
}

impl Operators {
    // insert operator in org with a given level
    pub async fn set(
        conn: &mut db::Conn,
        email: String,
        level: OperatorLevel,
        org: String,
    ) -> Result<usize> {
        let key = format!("org-ops:{}", org);
        let level_s = match level {
            OperatorLevel::L1 => "1",
            OperatorLevel::L2 => "2",
            OperatorLevel::L3 => "3",
        };

        let u = conn.hset(key, email, level_s).await?;

        Ok(u)
    }

    pub async fn check(
        conn: &mut db::Conn,
        email: String,
        org: String,
    ) -> Result<Option<OperatorLevel>> {
        let key = format!("org-ops:{}", org);
        let level = conn
            .hget(key, email)
            .await?
            .and_then(|s| OperatorLevel::parse(&s));

        Ok(level)
    }

    pub async fn list(conn: &mut db::Conn, org: String) -> Result<Vec<(String, OperatorLevel)>> {
        let hash = format!("org-ops:{}", org);
        let keys = conn.hgetall(hash).await?;
        let mut operators = Vec::new();

        for (email, s) in keys.iter() {
            let level = OperatorLevel::parse(&s);
            if let Some(level) = level {
                operators.push((email.clone(), level));
            }
        }

        Ok(operators)
    }

    pub async fn del(conn: &mut db::Conn, email: String, org: String) -> Result<usize> {
        let key = format!("org-ops:{}", org);
        let u = conn.hdel(key, email).await?;

        Ok(u)
    }
}
