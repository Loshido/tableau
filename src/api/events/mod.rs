use axum::{
    Router,
    routing::{get, post},
};

use crate::{SharedHandle, auth::middlewares::check_authentification};

mod delete;
mod get;
mod list;
mod post;

pub fn routes(state: SharedHandle) -> Router<SharedHandle> {
    Router::new()
        .route("/", post(post::handle).delete(delete::handle))
        .layer(axum::middleware::from_fn_with_state(
            state,
            check_authentification,
        ))
        .route("/{id}", get(get::handle))
        .route("/", get(list::handle))
}
