@echo off
echo 🚀 Starting NeuroLynxEdu AI Development Environment...

REM Start Docker services
echo 🐳 Starting Docker services...
docker-compose up -d

REM Wait for services
echo ⏳ Waiting for services to be ready...
timeout /t 15 /nobreak >nul

REM Check if React frontend needs dependencies
if not exist frontend-react\node_modules (
    echo 📦 Installing React dependencies...
    cd frontend-react
    npm install
    cd ..
)

echo ✅ Development environment is ready!
echo.
echo 🌐 Available services:
echo   - Frontend: http://localhost:3000
echo   - Backend: http://localhost:8000
echo   - API Docs: http://localhost:8000/docs
echo.
echo To start React development server, run:
echo   cd frontend-react
echo   npm start
echo.
echo Press any key to continue...
pause >nul