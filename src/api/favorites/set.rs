use axum::{Extension, extract::State, http::StatusCode};

use crate::{SharedHandle, auth::middlewares::Authentificated, data};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(auth): Extension<Authentificated>,
    favorites: String,
) -> Result<(), (StatusCode, String)> {
    data::Favorites::set(&auth.email, favorites, &mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(())
}
