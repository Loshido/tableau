/// handles the redirection to dash or to auth page
mod branch;

/// handles the set-cookie
mod cookies;

/// Step 1 for authentification : redirection to identity provider
mod redirect;

/// register user if not registered
mod register;

/// routes under /auth
mod router;

/// Step 2 for authentification : exchange given code
/// with identity provider to prove user's identity
mod verify;

/// serves the identity of the session
mod whoami;

pub use router::routes;
