/// handles the redirection to dash or to auth page
mod branch;

/// handles the set-cookie
mod cookies;

/// handles the user's logout
mod logout;

/// Step 1 for authentification : redirection to identity provider
mod redirect;

/// register user if not registered
mod register;

/// Step 2 for authentification : exchange given code
/// with identity provider to prove user's identity
mod verify;

/// serves the identity of the session
mod whoami;

use axum::{Router, routing::get};

use crate::SharedHandle;

pub fn routes() -> Router<SharedHandle> {
    Router::new()
        .route("/google", get(redirect::handle))
        .route("/verify", get(verify::handle))
        .route("/branch", get(branch::handle))
        .route("/whoami", get(whoami::handle))
        .route("/logout", get(logout::handle))
}
