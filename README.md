# Advanced Frontend Engineer Challenge

Frontend проект для 3 сценариев:

- Регистрация
- Авторизация
- Восстановление пароля

[Backend](https://github.com/aiezq/engineer-challenge)

## Запуск

Запускаем скрипт init.sh, который соберет образы и запустит их, ресурсы доступны по ссылкам

```bash
  sh ./config/scripts/init.sh
```

### Доступные endpoints:

- **Backend HTTPS**: `http://localhost:8000` (через caddy с SSL)
- **Frontend HTTPS**: `http://localhost:3000`
- **Database**: `localhost:5432` (PostgreSQL)
- **Redis**: `localhost:6379`

## Структура проекта

```text
frontend-engineer-challenge/
├── backend/                  # Python FastAPI бекенд
├── nginx/                    # Nginx конфигурация для HTTPS
├── ssl/                      # SSL сертификаты
├── config/                   # Конфигурационные файлы
└── docker-compose.yml        # dockeer compose конфиг
```
