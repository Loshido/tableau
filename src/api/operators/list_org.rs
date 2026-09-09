use axum::{Extension, Json, extract::State, http::StatusCode};
use tokio::task::JoinSet;

use crate::{SharedHandle, auth::middlewares::Authentificated, data};

// lists user's org where he is operator with levels
pub async fn handle(
    State(mut handle): State<SharedHandle>,
    Extension(authentification): Extension<Authentificated>,
) -> Result<Json<Vec<(String, data::Organisation, u32)>>, (StatusCode, String)> {
    let orgs = data::Organisation::list(&mut handle.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let mut futures = JoinSet::new();
    for (name, org) in orgs {
        let mut handle = handle.db.clone();
        let email = authentification.email.clone();

        futures.spawn(async move {
            let op = data::Operators::check(&mut handle, &email, &name).await;

            (name, org, op)
        });
    }

    let ops = futures
        .join_all()
        .await
        .iter()
        .filter_map(|(name, org, op)| match op {
            Ok(Some(level)) => Some((name.clone(), org.clone(), level.to_int())),
            _ => None,
        })
        .collect();

    Ok(Json(ops))
}
