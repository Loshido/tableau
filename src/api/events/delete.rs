use axum::{Extension, Json, extract::State, http::StatusCode};
use serde::Deserialize;

use crate::{SharedHandle, auth::middlewares::Authentificated, data};

#[derive(Deserialize, Debug)]
pub struct DeletePayload {
    pub org: String,
    pub event_id: String,
}

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(auth): Extension<Authentificated>,
    Json(payload): Json<DeletePayload>,
) -> Result<String, (StatusCode, String)> {
    let op_level = data::Operators::check(&mut handle.db, &auth.email, &payload.org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((
            StatusCode::FORBIDDEN,
            format!("Vous n'êtes pas opérateur pour {}", payload.org),
        ))?;

    match op_level {
        data::OperatorLevel::L1 => {
            return Err((
                StatusCode::FORBIDDEN,
                "Vous n'avez pas assez de privilèges pour créer un évènement".to_string(),
            ));
        }
        _ => {}
    }

    data::Event::delete(&mut handle.db, &payload.event_id)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(payload.event_id)
}
