#!/bin/bash
set -e

# Инициализация проекта
echo "[orbitto] initialization..."

# Проверяем наличие файла .env.example в корне
if [ -f "./config/.env.example" ]; then

    echo "[orbitto] root copy .env..."
    cp "./config/.env.example" ".env"
    if [ -f "./config/../.env" ]; then
        echo "[orbitto] root copy created"
    else
        echo "[orbitto] root copy error: ???"
        exit 1
    fi
else
    echo "[orbitto] .env.example not exist"
fi


# проверяем наличие докера в системе
if ! command -v docker &> /dev/null; then
    echo "[orbitto] docker not installed"
    exit 1
fi

# собираем докер-композ-сервисы
echo "[orbitto] build docker-compose services"
docker-compose build --no-cache
# запускаем сервисы
echo "[orbitto] start docker-compose services"
docker-compose up -d

# docker compose cp caddy:/data/caddy/pki/authorities/local/root.crt ./caddy-root.crt
# # macOS
# sudo security add-trusted-cert -d -r trustRoot \
#   -k /Library/Keychains/System.keychain ./caddy-root.crt

echo "[orbitto] initialization completed"
echo "[orbitto] services available at:"
echo "  - Backend HTTPS: https://localhost:${BACKEND_PORT_EXTERNAL:-7000}"
echo "  - Database:      localhost:${POSTGRES_PORT:-5432}"
echo "  - Redis:         localhost:${REDIS_PORT:-6379}"