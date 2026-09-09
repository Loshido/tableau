use axum::{Json, extract::State, http::StatusCode};

use crate::{SharedHandle, data};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
) -> Result<Json<Vec<(String, data::Event)>>, (StatusCode, String)> {
    let events = data::Event::list(&mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(events))
}
