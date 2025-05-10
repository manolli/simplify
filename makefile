# Caminhos principais
COMPOSE_DEV=docker-compose.dev.yml
COMPOSE_PROD=docker-compose.yml

# Subir MongoDB em dev + rodar localmente
dev:
	@chmod +x ./start-local.sh
	./start-local.sh

# Subir todos os serviços via Docker Compose (produção)
up:
	docker compose -f $(COMPOSE_PROD) up -d --build

# Subir apenas Mongo (dev)
mongo:
	docker compose -f $(COMPOSE_DEV) up -d

# Derrubar tudo (ambos)
down:
	docker compose -f $(COMPOSE_PROD) down
	docker compose -f $(COMPOSE_DEV) down

# Build frontend isolado
build-frontend:
	docker compose -f $(COMPOSE_PROD) build frontend

# Ver logs do frontend
logs-frontend:
	docker compose logs -f frontend

# Remover containers/parar tudo
clean:
	docker system prune -f
