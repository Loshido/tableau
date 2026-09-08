use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::Redirect,
};
use axum_extra::extract::CookieJar;
use serde::Deserialize;
use tracing::{Level, event};

use super::{cookies, register};
use crate::{SharedHandle, auth, data};

#[derive(Deserialize)]
pub struct VerifyQuery {
    code: String,
    state: String,
}

/// callback for the identity provider, takes a code and state as input
/// and returns a cookie session and redirection or an error
pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Query(params): Query<VerifyQuery>,
) -> Result<(CookieJar, Redirect), (StatusCode, String)> {
    let session_data = handle
        .oidc
        .exchange_code(params.code, params.state, &mut handle.db)
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    event!(
        Level::DEBUG,
        "user {} logged using oidc with sub = {}",
        &session_data.email,
        &session_data.sub
    );

    let (session, favorites) = {
        let mut conn = handle.db.clone();
        let (session, favorites) = tokio::join!(
            auth::session::new_session(&session_data, &mut conn),
            data::Favorites::get(&session_data.email, &mut handle.db)
        );

        (
            session.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?,
            favorites.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?,
        )
    };

    let _user = register::register_user(session_data, &mut handle.db).await?;
    let cookies = cookies::set(session);

    let redirection = match favorites {
        Some(_favorites) => Redirect::to("/dash/discover"),
        None => Redirect::to("/boarding/associations"),
    };

    Ok((cookies, redirection))
}
