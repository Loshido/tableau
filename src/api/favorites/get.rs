use axum::{Extension, extract::State, http::StatusCode};

use crate::{SharedHandle, auth::middlewares::Authentificated, data};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(auth): Extension<Authentificated>,
) -> Result<String, (StatusCode, String)> {
    let favorites = data::Favorites::get(&auth.email, &mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::NOT_FOUND, "introuvable".to_string()))?;

    Ok(favorites.0)
}
