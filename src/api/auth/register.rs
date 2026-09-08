use crate::{auth::oidc::SessionData, data, db};
use axum::http::StatusCode;
use tracing::{Level, event};

/// register user if not already registered
pub(super) async fn register_user(
    session_data: SessionData,
    conn: &mut db::Conn,
) -> Result<data::User, (StatusCode, String)> {
    let user_request = data::User::get(conn, &session_data.email)
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;

    if let Some(user) = user_request {
        Ok(user)
    } else {
        event!(
            Level::DEBUG,
            "user {} isn't registered",
            &session_data.email
        );

        let user = data::User {
            email: session_data.email.to_string(),
            sub: session_data.sub.to_string(),
            name: session_data.name.unwrap_or("".to_string()),
            picture: session_data.picture.clone(),
        };

        match data::User::create(conn, &user).await {
            Ok(email) => event!(Level::DEBUG, "user indexed as {} registered", email),
            Err(err) => {
                event!(
                    Level::ERROR,
                    "failed to register user {} because {}",
                    &user.email,
                    err
                );
                return Err((StatusCode::BAD_REQUEST, err.to_string()));
            }
        };

        Ok(user)
    }
}
