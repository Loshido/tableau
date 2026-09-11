use axum::{
    Router, middleware,
    routing::{get, post},
};

use crate::{SharedHandle, auth::middlewares::check_authentification};

// lists orgs
mod list;

// gets an org
mod get;

// sets an org
mod set;

// deletes an org
mod delete;

pub fn routes(state: SharedHandle) -> Router<SharedHandle> {
    Router::new()
        .route("/{org_id}", post(set::handle).delete(delete::handle))
        .layer(middleware::from_fn_with_state(
            state,
            check_authentification,
        ))
        .route("/{org_id}", get(get::handle))
        .route("/", get(list::handle))
}
