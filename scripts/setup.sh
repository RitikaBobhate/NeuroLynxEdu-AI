#!/bin/bash

# NeuroLynxEdu AI Setup Script

echo "🧠 Setting up NeuroLynxEdu AI Development Environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/app/logs
mkdir -p frontend-react/public
mkdir -p database/backups
mkdir -p scripts/logs

# Build and start services
echo "🐳 Building and starting Docker services..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
docker-compose ps

# Install Ollama models
echo "🤖 Setting up Ollama models..."
docker exec neurolynx_ollama ollama pull llama2:7b-chat
docker exec neurolynx_ollama ollama pull codellama:7b-instruct

# Setup Neo4j constraints and indexes
echo "📊 Setting up Neo4j database..."
docker exec neurolynx_neo4j cypher-shell -u neo4j -p neurolynx123 "
CREATE CONSTRAINT user_id IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT course_id IF NOT EXISTS FOR (c:Course) REQUIRE c.id IS UNIQUE;
CREATE INDEX user_email IF NOT EXISTS FOR (u:User) ON (u.email);
"

echo "✅ Setup complete!"
echo ""
echo "🌐 Services are now running:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend API: http://localhost:8000"
echo "  - API Docs: http://localhost:8000/docs"
echo "  - PostgreSQL: localhost:5432"
echo "  - Neo4j Browser: http://localhost:7474"
echo "  - Keycloak: http://localhost:8080"
echo "  - MinIO Console: http://localhost:9001"
echo "  - Redis: localhost:6379"
echo ""
echo "📚 Next steps:"
echo "  1. Configure Keycloak realm and client"
echo "  2. Update .env file with your settings"
echo "  3. Run 'npm install' in frontend-react directory"
echo "  4. Start developing!"