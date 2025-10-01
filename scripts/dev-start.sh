#!/bin/bash

# Development startup script

echo "🚀 Starting NeuroLynxEdu AI Development Environment..."

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check if React frontend needs dependencies
if [ ! -d "frontend-react/node_modules" ]; then
    echo "📦 Installing React dependencies..."
    cd frontend-react
    npm install
    cd ..
fi

# Start React development server
echo "⚛️ Starting React development server..."
cd frontend-react
npm start &
cd ..

echo "✅ Development environment is ready!"
echo ""
echo "🌐 Available services:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend: http://localhost:8000"
echo "  - API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep script running
wait