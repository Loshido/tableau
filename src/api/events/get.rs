use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};

use crate::{SharedHandle, data};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Path(event_id): Path<String>,
) -> Result<Json<data::Event>, (StatusCode, String)> {
    let event = data::Event::get(&mut handle.db, &event_id)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::NOT_FOUND, "Introuvable".to_string()))?;

    Ok(Json(event))
}
