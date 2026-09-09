use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;
use serde::Serialize;

#[derive(Clone, Debug, Copy)]
pub struct Operators;

#[derive(Clone, Debug, Copy)]
pub enum OperatorLevel {
    /// Able to scan tickets
    L1,
    /// L1 + able to create events in its org
    L2,
    /// L2 + able to manage org's operators + org's page
    L3,
}

impl Serialize for OperatorLevel {
    fn serialize<S>(&self, serializer: S) -> std::prelude::v1::Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            OperatorLevel::L1 => serializer.serialize_u32(1),
            OperatorLevel::L2 => serializer.serialize_u32(2),
            OperatorLevel::L3 => serializer.serialize_u32(3),
        }
    }
}

impl OperatorLevel {
    pub fn to_int(&self) -> u32 {
        match self {
            Self::L1 => 1,
            Self::L2 => 2,
            Self::L3 => 3,
        }
    }
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
    /// inserts or overwrite operator in org with a given level
    /// (only level can be overwrite)
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

    /// checks the operator level for a given email and org
    pub async fn check(
        conn: &mut db::Conn,
        email: &str,
        org: &str,
    ) -> Result<Option<OperatorLevel>> {
        let key = format!("org-ops:{}", org);
        let level = conn
            .hget(key, email)
            .await?
            .and_then(|s| OperatorLevel::parse(&s));

        Ok(level)
    }

    /// lists all operators within an org
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

    /// removes an operator from an org
    pub async fn del(conn: &mut db::Conn, email: String, org: String) -> Result<usize> {
        let key = format!("org-ops:{}", org);
        let u = conn.hdel(key, email).await?;

        Ok(u)
    }
}
