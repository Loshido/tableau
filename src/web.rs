use std::path::PathBuf;
use tower_http::services::{ServeDir, ServeFile, fs::TokioBackend};
use tracing::{Level, event};

pub fn web_service() -> ServeDir<ServeFile, TokioBackend> {
    let dist_path = std::env::var("DIST_PATH").unwrap_or("./dist".to_string());
    let index_path = PathBuf::from(&dist_path).join("index.html");
    event!(
        Level::DEBUG,
        "web mounted using \"{}\" as dist_path",
        &dist_path
    );

    let index = ServeFile::new(index_path);
    let dist = ServeDir::new(dist_path)
        .append_index_html_on_directories(true)
        .fallback(index);

    dist
}
