#!/bin/bash

echo "📦 Subindo MongoDB com Docker Compose (modo dev)..."
docker compose -f docker-compose.dev.yml up -d

sleep 2
echo "✅ MongoDB disponível em localhost:27017"

echo "🔁 Iniciando serviços locais..."

pnpm dev
echo "✅ Serviços locais iniciados com sucesso!"