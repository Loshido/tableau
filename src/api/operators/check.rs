use axum::{
    Extension, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::Serialize;

use crate::{
    SharedHandle,
    auth::middlewares::Authentificated,
    data::{self, OperatorLevel},
};

#[derive(Serialize)]
pub struct CheckBody {
    pub level: u32,
    pub org: String,
    pub email: String,
}

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(authentification): Extension<Authentificated>,
    Path((org, email)): Path<(String, String)>,
) -> Result<Json<CheckBody>, (StatusCode, String)> {
    let level = data::Operators::check(&mut handle.db, &authentification.email, &org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((
            StatusCode::FORBIDDEN,
            format!("Vous n'êtes pas opérateur pour {}", &org),
        ))?;

    match level {
        OperatorLevel::L1 | OperatorLevel::L2 => {
            return Err((
                StatusCode::FORBIDDEN,
                "Vous n'avez pas assez de privilèges pour modifier un opérateur".to_string(),
            ));
        }
        _ => {}
    }

    let operator_level = data::Operators::check(&mut handle.db, &email, &org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::NOT_FOUND, "introuvable".to_string()))?;

    let body = CheckBody {
        level: operator_level.to_int(),
        email,
        org,
    };

    Ok(Json(body))
}
