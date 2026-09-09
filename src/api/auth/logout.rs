use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::Redirect,
};
use axum_extra::extract::CookieJar;

use crate::{SharedHandle, auth};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    cookies: CookieJar,
) -> Result<(CookieJar, HeaderMap, Redirect), (StatusCode, String)> {
    let cookie = cookies
        .get("session")
        .ok_or((StatusCode::BAD_REQUEST, "unauthentificated".to_string()))?;

    auth::session::remove_session(cookie.value(), &mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let jar = cookies.remove("session");
    let mut headers = HeaderMap::new();
    headers.insert("Clear-Site-Data", "*".parse().unwrap());

    Ok((jar, headers, Redirect::to("/")))
}
