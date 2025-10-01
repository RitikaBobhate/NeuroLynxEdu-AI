@echo off
echo 🔧 Fixing NeuroLynxEdu AI Issues and Restarting...
echo ================================================

echo 📋 Step 1: Stopping all containers...
docker-compose down

echo 🧹 Step 2: Cleaning up Docker resources...
docker system prune -f

echo 🔨 Step 3: Rebuilding containers...
docker-compose build --no-cache backend frontend

echo 🚀 Step 4: Starting services...
docker-compose up -d

echo ⏳ Step 5: Waiting for services to start...
timeout /t 30 /nobreak >nul

echo 🔍 Step 6: Checking service status...
docker-compose ps

echo ✅ Restart complete!
echo.
echo 🌐 Service URLs:
echo   Frontend: http://localhost:3000
echo   Backend: http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
echo 📝 Demo Accounts:
echo   alice_chen / demo123
echo   prof_martinez / demo123
echo   admin_system / demo123
echo.
echo Press any key to continue...
pause >nul