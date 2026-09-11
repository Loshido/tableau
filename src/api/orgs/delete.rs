use crate::{SharedHandle, auth::middlewares::Authentificated, data};

use axum::{
    Extension,
    extract::{Path, State},
    http::StatusCode,
};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(_auth): Extension<Authentificated>,
    Path(org_id): Path<String>,
) -> Result<(), (StatusCode, String)> {
    // todo: check auth so that only Tableau's admin can delete org

    data::Organisation::delete(&mut handle.db, &org_id)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(())
}
