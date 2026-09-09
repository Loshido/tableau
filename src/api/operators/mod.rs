use axum::{Router, middleware, routing::get};

// lists events from a given operator
mod list_org;

use crate::{SharedHandle, auth::middlewares::check_authentification};

pub fn routes(state: SharedHandle) -> Router<SharedHandle> {
    Router::new()
        .route("/list-org", get(list_org::handle))
        .layer(middleware::from_fn_with_state(
            state,
            check_authentification,
        ))
}
