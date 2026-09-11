use crate::{SharedHandle, data};

use axum::{Json, extract::State, http::StatusCode};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
) -> Result<Json<Vec<(String, data::Organisation)>>, (StatusCode, String)> {
    let orgs = data::Organisation::list(&mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(orgs))
}
