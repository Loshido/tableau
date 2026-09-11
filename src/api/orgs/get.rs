use crate::{SharedHandle, data};

use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Path(org_id): Path<String>,
) -> Result<Json<data::Organisation>, (StatusCode, String)> {
    let org = data::Organisation::get(&mut handle.db, &org_id)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::NOT_FOUND, "introuvable".to_string()))?;

    Ok(Json(org))
}
