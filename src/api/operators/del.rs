use axum::{
    Extension,
    extract::{Path, State},
    http::StatusCode,
};

use crate::{
    SharedHandle,
    auth::middlewares::Authentificated,
    data::{self, OperatorLevel},
};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(authentification): Extension<Authentificated>,
    Path((org, email)): Path<(String, String)>,
) -> Result<(), (StatusCode, String)> {
    let level = data::Operators::check(&mut handle.db, &authentification.email, &org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((
            StatusCode::FORBIDDEN,
            format!("Vous n'êtes pas opérateur pour {}", &org),
        ))?;

    let target_level = data::Operators::check(&mut handle.db, &email, &org)
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

    match target_level {
        OperatorLevel::L1 | OperatorLevel::L2 => {}
        _ => {
            return Err((
                StatusCode::FORBIDDEN,
                "Vous n'avez pas assez de privilèges pour modifier \
                un opérateur de niveau supérieur"
                    .to_string(),
            ));
        }
    };

    data::Operators::del(&mut handle.db, email, org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(())
}
