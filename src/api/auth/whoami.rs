use axum::{Json, extract::State, http::StatusCode};
use axum_extra::extract::CookieJar;

use crate::{SharedHandle, auth, data};

/// redirects to identity provider with a state and configured settings
/// if authentificated redirects to dashboard
pub async fn handle(
    State(mut handle): State<SharedHandle>,
    cookies: CookieJar,
) -> Result<Json<data::User>, (StatusCode, String)> {
    let cookie = cookies
        .get("session")
        .ok_or((StatusCode::BAD_REQUEST, "unauthentificated".to_string()))?;

    let email = auth::session::check_session(cookie.value(), &mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::BAD_REQUEST, "unauthentificated".to_string()))?;

    let user = data::User::get(&mut handle.db, &email)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::BAD_REQUEST, "not found".to_string()))?;

    Ok(Json(user))
}
