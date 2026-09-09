use axum::{Router, middleware, routing::get};

// sets a level to an operator in an org
mod set;

// looks up for an operator's level in an org
mod check;

// deletes operator in an org
mod del;

// lists operators from a given operator
mod list;

// lists events from a given operator
mod list_org;

use crate::{SharedHandle, auth::middlewares::check_authentification};

pub fn routes(state: SharedHandle) -> Router<SharedHandle> {
    Router::new()
        .route(
            "/{org}/{email}",
            get(check::handle).post(set::handle).delete(del::handle),
        )
        .route("/{org}", get(list::handle))
        .route("/list-org", get(list_org::handle))
        .layer(middleware::from_fn_with_state(
            state,
            check_authentification,
        ))
}
