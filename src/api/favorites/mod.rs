use axum::{Router, middleware, routing::get};

use crate::{SharedHandle, auth::middlewares::check_authentification};

// gets user's favorites
mod get;

// sets user's favorites
mod set;

pub fn routes(state: SharedHandle) -> Router<SharedHandle> {
    Router::new()
        .route("/", get(get::handle).post(set::handle))
        .layer(middleware::from_fn_with_state(
            state,
            check_authentification,
        ))
}
