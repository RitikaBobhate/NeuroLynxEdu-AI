@echo off
echo 🧠 Setting up NeuroLynxEdu AI Development Environment...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created. Please update it with your configuration.
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist backend\app\logs mkdir backend\app\logs
if not exist frontend-react\public mkdir frontend-react\public
if not exist database\backups mkdir database\backups
if not exist scripts\logs mkdir scripts\logs

REM Build and start services
echo 🐳 Building and starting Docker services...
docker-compose up -d --build

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check service health
echo 🔍 Checking service health...
docker-compose ps

REM Install Ollama models
echo 🤖 Setting up Ollama models...
docker exec neurolynx_ollama ollama pull llama2:7b-chat
docker exec neurolynx_ollama ollama pull codellama:7b-instruct

echo ✅ Setup complete!
echo.
echo 🌐 Services are now running:
echo   - Frontend: http://localhost:3000
echo   - Backend API: http://localhost:8000
echo   - API Docs: http://localhost:8000/docs
echo   - PostgreSQL: localhost:5432
echo   - Neo4j Browser: http://localhost:7474
echo   - Keycloak: http://localhost:8080
echo   - MinIO Console: http://localhost:9001
echo   - Redis: localhost:6379
echo.
echo 📚 Next steps:
echo   1. Configure Keycloak realm and client
echo   2. Update .env file with your settings
echo   3. Run 'npm install' in frontend-react directory
echo   4. Start developing!
pause