use axum::{Extension, Json, extract::State, http::StatusCode};

use crate::{SharedHandle, auth::middlewares::Authentificated, data};

pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(auth): Extension<Authentificated>,
    Json(event): Json<data::Event>,
) -> Result<String, (StatusCode, String)> {
    let op_level = data::Operators::check(&mut handle.db, &auth.email, &event.org)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((
            StatusCode::FORBIDDEN,
            format!("Vous n'êtes pas opérateur pour {}", event.org),
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

    let event_id = data::Event::create(&mut handle.db, event)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(event_id)
}
