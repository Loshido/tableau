use base64::{Engine as _, engine::general_purpose};
use rand::fill;

mod event;
mod favorites;
mod operators;
mod orgs;
mod users;

pub use event::Event;
pub use favorites::Favorites;
pub use operators::OperatorLevel;
pub use operators::Operators;
pub use orgs::Organisation;
pub use users::User;

fn random_string(n: Option<usize>) -> String {
    let mut bytes = vec![0u8; n.unwrap_or(32)];
    fill(&mut bytes);

    general_purpose::URL_SAFE_NO_PAD.encode(bytes)
}
