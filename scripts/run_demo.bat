@echo off
echo 🧠 NeuroLynxEdu AI - Professor Demo Launcher
echo ================================================

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.11+ and try again
    pause
    exit /b 1
)

REM Run the demo setup script
echo 🚀 Running comprehensive demo setup...
echo.

python scripts/demo_setup.py

if errorlevel 1 (
    echo.
    echo ❌ Demo setup failed. Please check the error messages above.
    echo.
    echo 🔧 Troubleshooting steps:
    echo 1. Ensure Docker Desktop is running
    echo 2. Check if ports 3000, 8000, 5432, 7474, 8080 are available
    echo 3. Run 'docker-compose down' and try again
    echo 4. Check Docker logs: 'docker-compose logs'
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Demo setup complete!
echo.
echo 🎯 Next steps for your presentation:
echo 1. Open demo_quick_access.html in your browser
echo 2. Follow the DEMO_SCRIPT.md for presentation flow
echo 3. Test login with demo accounts before presenting
echo.
echo 📱 Demo Accounts:
echo   Student: alice_chen / demo123
echo   Educator: prof_martinez / demo123
echo   Admin: admin_system / demo123
echo.
echo 🌐 Key URLs:
echo   Main App: http://localhost:3000
echo   API Docs: http://localhost:8000/docs
echo   Neo4j: http://localhost:7474
echo.
echo Press any key to open the quick access page...
pause >nul

REM Open the quick access page
start demo_quick_access.html

echo.
echo 🎉 Ready for your professor demonstration!
echo Good luck with your presentation!
pause