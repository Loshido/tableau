docker run --name dragonfly -d \
    -v ./volume:/data \
    --ulimit memlock=-1 \
    -p 6379:6379 \
    ghcr.io/dragonflydb/dragonfly:v1.40.1 \
    --dir /data \
    --dbfilename tab \
    --snapshot_cron "*/5 * * * *"

# interchangeable avec redis ou valkey
