use axum::{
    Json,
    extract::{Query, State},
    http::StatusCode,
    response::Redirect,
};
use serde::Deserialize;

use crate::{SharedHandle, auth::oidc::SessionData};

pub async fn redirect(State(handle): State<SharedHandle>) -> Result<Redirect, StatusCode> {
    match handle.oidc.authorization_url(handle.db).await {
        Ok(redirection_url) => Ok(Redirect::to(&redirection_url)),
        Err(_e) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

#[derive(Deserialize)]
pub struct VerifyQuery {
    code: String,
    state: String,
}

pub async fn verify(
    State(handle): State<SharedHandle>,
    Query(params): Query<VerifyQuery>,
) -> Result<Json<SessionData>, StatusCode> {
    match handle
        .oidc
        .exchange_code(params.code, params.state, handle.db)
        .await
    {
        Ok(session) => Ok(Json(session)),
        Err(_error) => Err(StatusCode::BAD_REQUEST),
    }
}
