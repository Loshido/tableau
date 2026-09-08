use base64::{Engine as _, engine::general_purpose};
use rand::fill;

mod event;
mod favorites;
mod operators;
mod organisation;
mod user;

pub use event::Event;
pub use favorites::Favorites;
pub use operators::Operators;
pub use organisation::Organisation;
pub use user::User;

fn random_string(n: Option<usize>) -> String {
    let mut bytes = vec![0u8; n.unwrap_or(32)];
    fill(&mut bytes);

    general_purpose::URL_SAFE_NO_PAD.encode(bytes)
}
