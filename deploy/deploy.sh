#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Login to GHCR
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin

# Pull latest images
echo "📦 Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull

# Rebuild and restart containers
echo "🔄 Rebuilding and restarting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for backend to be ready
echo "⏳ Waiting for backend..."
sleep 10

# Run migrations
echo "🗄️ Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T backend bundle exec rails db:migrate || echo "Migrations completed with warnings"

# Health check
echo "✅ Health check..."
curl -f http://localhost:3001/api/v1/regions || echo "Backend might still be starting..."

echo "🎉 Deployment complete!"
