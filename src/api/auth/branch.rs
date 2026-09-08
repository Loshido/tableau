use axum::{extract::State, http::StatusCode, response::Redirect};
use axum_extra::extract::CookieJar;

use crate::{SharedHandle, auth};

/// branches either to authentification page or to dashboard
pub async fn handle(
    State(mut handle): State<SharedHandle>,
    cookies: CookieJar,
) -> Result<Redirect, (StatusCode, String)> {
    if let Some(cookie) = cookies.get("session") {
        let check = auth::session::check_session(cookie.value(), &mut handle.db)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

        if let Some(_email) = check {
            return Ok(Redirect::to("/dash/discover"));
        }
    }

    Ok(Redirect::to("/auth"))
}
