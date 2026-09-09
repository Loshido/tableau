use crate::{
    SharedHandle,
    auth::middlewares::Authentificated,
    data::{self, OperatorLevel},
};

use axum::{
    Extension, Json,
    extract::{Path, State},
    http::StatusCode,
};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(authentification): Extension<Authentificated>,
    Path(org_id): Path<String>,
) -> Result<Json<Vec<(String, OperatorLevel)>>, (StatusCode, String)> {
    let level = data::Operators::check(&mut handle.db, &authentification.email, &org_id)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((
            StatusCode::FORBIDDEN,
            format!("Vous n'êtes pas opérateur pour {}", &org_id),
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

    let operators = data::Operators::list(&mut handle.db, org_id)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(operators))
}
