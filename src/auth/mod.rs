pub mod middlewares;
pub mod oidc;
pub mod session;
mod state;

use base64::{Engine as _, engine::general_purpose};
use rand::fill;

fn random_string(n: Option<usize>) -> String {
    let mut bytes = vec![0u8; n.unwrap_or(32)];
    fill(&mut bytes);

    general_purpose::URL_SAFE_NO_PAD.encode(bytes)
}
