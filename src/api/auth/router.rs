use axum::{Router, routing::get};

use crate::SharedHandle;

pub fn routes() -> Router<SharedHandle> {
    Router::new()
        .route("/google", get(super::redirect::handle))
        .route("/verify", get(super::verify::handle))
        .route("/branch", get(super::branch::handle))
        .route("/whoami", get(super::whoami::handle))
}
