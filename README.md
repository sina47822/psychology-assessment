# 1) create network and external volumes
sudo docker network create teenapp_network
sudo docker volume create teenapp_postgres_data
sudo docker volume create teenapp_media_volume
## if i want to delete database
sudo docker volume rm teenapp_postgres_data
# 2) build + start DB and backend together (so depends_on resolves)
sudo docker compose -f docker-compose.db.yml -f docker-compose.backend.yml up -d --build

# 3) migrate and collectstatic (use the same merged files)
sudo docker compose -f docker-compose.db.yml -f docker-compose.backend.yml run --rm backend python manage.py migrate
sudo docker compose -f docker-compose.db.yml -f docker-compose.backend.yml run --rm backend python manage.py collectstatic --noinput

# 4) Down All frontend and nginx and Backend (merge all files)
sudo docker compose -f docker-compose.db.yml -f docker-compose.backend.yml -f docker-compose.frontend.yml -f docker-compose.nginx.yml down

# 5) build + start frontend and nginx (merge all files)
sudo docker compose -f docker-compose.db.yml -f docker-compose.backend.yml -f docker-compose.frontend.yml -f docker-compose.nginx.yml up -d --build
