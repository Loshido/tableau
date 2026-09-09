use axum::{
    Extension,
    extract::{Path, Query, State},
    http::StatusCode,
};
use serde::Deserialize;

use crate::{
    SharedHandle,
    auth::middlewares::Authentificated,
    data::{self, OperatorLevel},
};

#[derive(Deserialize)]
pub struct SetQuery {
    pub level: u32,
}

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(authentification): Extension<Authentificated>,
    Query(set): Query<SetQuery>,
    Path((org, email)): Path<(String, String)>,
) -> Result<(), (StatusCode, String)> {
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

    let set_level = match set.level {
        2 => OperatorLevel::L2,
        3 => OperatorLevel::L3,
        _ => OperatorLevel::L1,
    };

    data::Operators::set(&mut handle.db, email, set_level, org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(())
}
