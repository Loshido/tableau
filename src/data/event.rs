use crate::db;
use anyhow::Result;
use redis::AsyncTypedCommands;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Event {
    pub category: String,
    pub title: String,
    pub org: String,
    pub place: String,
    pub description: String,
    pub xp: u32,
    pub date: u64,

    // thumbnail href
    pub src_thumbnail: Option<String>,
    // additional css href
    pub src_css: Option<String>,
    // additional html href
    pub src_page: Option<String>,
}

impl Event {
    // create a new event and store it
    pub async fn create(conn: &mut db::Conn, event: Event) -> Result<String> {
        let event_id = super::random_string(Some(32));
        let key = format!("event:{}", event_id);
        let serialized = serde_json::to_string(&event)?;

        conn.set(&key, serialized).await?;
        Ok(event_id)
    }

    // retrieve an event by ID
    pub async fn get(conn: &mut db::Conn, event_id: &str) -> Result<Option<Event>> {
        let key = format!("event:{}", event_id);
        let data: Option<String> = conn.get(&key).await?;

        Ok(data.and_then(|d| serde_json::from_str(&d).ok()))
    }

    // update an existing event
    pub async fn update(conn: &mut db::Conn, event_id: &str, event: Event) -> Result<()> {
        let key = format!("event:{}", event_id);
        let serialized = serde_json::to_string(&event)?;

        conn.set(&key, serialized).await?;
        Ok(())
    }

    // Delete an event by ID
    pub async fn delete(conn: &mut db::Conn, event_id: &str) -> Result<()> {
        let key = format!("event:{}", event_id);
        conn.del(&key).await?;
        Ok(())
    }

    // List all events
    pub async fn list(conn: &mut db::Conn) -> Result<Vec<(String, Event)>> {
        let keys: Vec<String> = conn.keys("event:*").await?;
        let mut events = Vec::new();

        for key in keys {
            if let Some(data) = conn.get(&key).await? {
                if let Ok(event) = serde_json::from_str::<Event>(&data) {
                    let event_id = key.strip_prefix("event:").unwrap_or("").to_string();
                    events.push((event_id, event));
                }
            }
        }

        Ok(events)
    }
}
