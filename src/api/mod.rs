use axum::{
    Json,
    extract::{Query, State},
    http::StatusCode,
    response::Redirect,
};
use serde::{Deserialize, Serialize};

use crate::{
    SharedHandle,
    auth::{SessionData, UserInfo},
};

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

#[derive(Serialize)]
pub struct VerifyResponse {
    pub user: UserInfo,
    pub session: SessionData,
}

pub async fn verify(
    State(handle): State<SharedHandle>,
    Query(params): Query<VerifyQuery>,
) -> Result<Json<VerifyResponse>, StatusCode> {
    match handle
        .oidc
        .exchange_code(params.code, params.state, handle.db)
        .await
    {
        Ok((user, session)) => Ok(Json(VerifyResponse { user, session })),
        Err(_error) => Err(StatusCode::BAD_REQUEST),
    }
}
