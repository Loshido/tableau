use crate::{SharedHandle, auth::middlewares::Authentificated, data};

use axum::{
    Extension, Json,
    extract::{Path, State},
    http::StatusCode,
};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(_auth): Extension<Authentificated>,
    Path(org_id): Path<String>,
    Json(org): Json<data::Organisation>,
) -> Result<(), (StatusCode, String)> {
    // todo: check auth so that only Tableau's admin can create new org

    data::Organisation::set(&mut handle.db, &org_id, org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(())
}
