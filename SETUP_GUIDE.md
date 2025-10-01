# NeuroLynxEdu AI - Complete Setup Guide

## 🎯 What You'll Build

NeuroLynxEdu AI is an advanced educational platform that uses EEG brain monitoring and AI to create personalized learning experiences. This guide will help you set up the complete development environment on your local machine.

## 📋 Prerequisites & Software Installation

### Required Software

#### 1. Git (Version Control)
**Windows:**
- Download from: https://git-scm.com/download/win
- Run installer with default settings
- Verify installation: Open Command Prompt and type `git --version`

**Mac:**
- Install via Homebrew: `brew install git`
- Or download from: https://git-scm.com/download/mac

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# CentOS/RHEL
sudo yum install git
```

#### 2. Docker Desktop (Container Platform)
**Windows:**
- Download from: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
- Run installer and restart computer
- Enable WSL 2 if prompted
- Verify: Open Command Prompt and type `docker --version`

**Mac:**
- Download from: https://desktop.docker.com/mac/main/amd64/Docker.dmg
- Drag to Applications folder
- Launch Docker Desktop

**Linux:**
```bash
# Ubuntu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and back in
```

#### 3. Node.js (JavaScript Runtime)
**All Platforms:**
- Download LTS version from: https://nodejs.org/
- Choose version 18.x or higher
- Verify installation: `node --version` and `npm --version`

#### 4. Python (Programming Language)
**Windows:**
- Download from: https://www.python.org/downloads/
- Choose version 3.11 or higher
- ⚠️ **IMPORTANT**: Check "Add Python to PATH" during installation
- Verify: `python --version`

**Mac:**
```bash
# Using Homebrew
brew install python@3.11
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip

# CentOS/RHEL
sudo yum install python3.11 python3.11-pip
```

#### 5. Code Editor (Recommended: VS Code)
- Download from: https://code.visualstudio.com/
- Install recommended extensions:
  - Python
  - Docker
  - React
  - Tailwind CSS IntelliSense

## 🚀 Project Setup

### Step 1: Download the Project

#### Option A: If you have the project as a ZIP file
1. Extract the ZIP file to your desired location (e.g., `C:\Projects\` on Windows)
2. Open Command Prompt/Terminal and navigate to the project folder:
```cmd
cd C:\Projects\neurolynx-edu-ai
```

#### Option B: If cloning from Git repository
```bash
git clone https://github.com/your-username/neurolynx-edu-ai.git
cd neurolynx-edu-ai
```

### Step 2: Verify Project Structure
Your project should look like this:
```
neurolynx-edu-ai/
├── backend/                 # Python FastAPI backend
├── frontend-react/          # React TypeScript frontend
├── database/               # Database initialization scripts
├── scripts/                # Setup and utility scripts
├── docker-compose.yml      # Docker services configuration
├── .env.example           # Environment variables template
└── README.md
```

## ⚙️ Environment Configuration

### Step 1: Create Environment File

**Windows:**
```cmd
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

### Step 2: Configure Environment Variables

Open the `.env` file in your text editor and update these key settings:

```env
# Database Configuration
POSTGRES_SERVER=localhost
POSTGRES_USER=neurolynx
POSTGRES_PASSWORD=neurolynx123
POSTGRES_DB=neurolynx_db
POSTGRES_PORT=5432

# Neo4j Configuration (Graph Database)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=neurolynx123

# Redis Configuration (Caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Keycloak Configuration (Authentication)
KEYCLOAK_SERVER_URL=http://localhost:8080
KEYCLOAK_REALM=neurolynx
KEYCLOAK_CLIENT_ID=neurolynx-api
KEYCLOAK_CLIENT_SECRET=your-client-secret

# Security (IMPORTANT: Change in production)
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI/ML Configuration (Optional for now)
HUGGINGFACE_API_KEY=your-huggingface-api-key
OLLAMA_BASE_URL=http://localhost:11434

# EEG Configuration
EEG_SAMPLING_RATE=250
EEG_BUFFER_SIZE=1000

# MinIO Configuration (File Storage)
MINIO_ROOT_USER=neurolynx
MINIO_ROOT_PASSWORD=neurolynx123
```

### Environment Variables Explained

| Variable | Purpose | Where to Get Value |
|----------|---------|-------------------|
| `POSTGRES_*` | Database connection | Use provided defaults for local development |
| `NEO4J_*` | Graph database for knowledge mapping | Use provided defaults |
| `KEYCLOAK_*` | User authentication service | Use provided defaults initially |
| `SECRET_KEY` | JWT token encryption | Generate random string (keep secret!) |
| `HUGGINGFACE_API_KEY` | AI model access | Sign up at https://huggingface.co/ (optional) |

## 🗄️ Database Setup

The project uses two databases:
1. **PostgreSQL** - For user data, courses, sessions
2. **Neo4j** - For knowledge graphs and learning relationships

### Automatic Setup (Recommended)

The databases will be automatically configured when you run Docker Compose. The initialization scripts are in the `database/init/` folder.

### Manual Verification (After Docker Setup)

#### PostgreSQL
```bash
# Connect to PostgreSQL (after Docker is running)
docker exec -it neurolynx_postgres psql -U neurolynx -d neurolynx_db

# List tables
\dt

# Exit
\q
```

#### Neo4j
1. Open browser to: http://localhost:7474
2. Login with:
   - Username: `neo4j`
   - Password: `neurolynx123`
3. Run test query: `MATCH (n) RETURN n LIMIT 10`

## 🐳 Docker Setup & Installation

### Step 1: Verify Docker Installation

```cmd
docker --version
docker-compose --version
```

You should see version numbers. If not, reinstall Docker Desktop.

### Step 2: Start All Services

**Windows (Recommended):**
```cmd
# Run the automated setup script
scripts\setup.bat
```

**Manual Setup (All Platforms):**
```bash
# Build and start all services
docker-compose up -d --build
```

### Step 3: Verify Services Are Running

```bash
# Check all containers are running
docker-compose ps
```

You should see these services running:
- `neurolynx_postgres` (Database)
- `neurolynx_neo4j` (Graph Database)
- `neurolynx_redis` (Cache)
- `neurolynx_keycloak` (Authentication)
- `neurolynx_backend` (API Server)
- `neurolynx_frontend` (React App)
- `neurolynx_minio` (File Storage)
- `neurolynx_ollama` (AI Models)

### Common Docker Issues & Solutions

#### Issue: Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution:**
```bash
# Find what's using the port
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /PID <process_id> /F

# Or change the port in docker-compose.yml
```

#### Issue: Docker Desktop Not Running
```
Error: Cannot connect to Docker daemon
```
**Solution:**
1. Start Docker Desktop application
2. Wait for it to fully load (whale icon in system tray)
3. Try the command again

#### Issue: Out of Disk Space
```
Error: No space left on device
```
**Solution:**
```bash
# Clean up Docker
docker system prune -a
docker volume prune
```

## 📦 Dependencies Installation

### Backend Dependencies (Python)

The backend dependencies are automatically installed in the Docker container. For local development:

```bash
cd backend
pip install -r requirements.txt
```

### Frontend Dependencies (Node.js)

```bash
cd frontend-react
npm install
```

If you encounter errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔗 Service Connections & Configuration

### Step 1: Wait for Services to Start

After running `docker-compose up -d --build`, wait 2-3 minutes for all services to fully initialize.

### Step 2: Configure Keycloak (Authentication)

1. **Access Keycloak Admin Console:**
   - URL: http://localhost:8080
   - Username: `admin`
   - Password: `admin123`

2. **Create Realm:**
   - Click "Create Realm"
   - Name: `neurolynx`
   - Click "Create"

3. **Create Client:**
   - Go to "Clients" → "Create client"
   - Client ID: `neurolynx-api`
   - Client type: `OpenID Connect`
   - Click "Save"

4. **Configure Client:**
   - Set "Access Type" to `confidential`
   - Add Valid Redirect URIs: `http://localhost:3000/*`
   - Save and note the Client Secret from "Credentials" tab

5. **Create Test User:**
   - Go to "Users" → "Add user"
   - Username: `testuser`
   - Email: `test@neurolynx.com`
   - Click "Create"
   - Go to "Credentials" tab
   - Set password: `testpass123`
   - Turn off "Temporary"

### Step 3: Test Database Connections

#### Test PostgreSQL:
```bash
# Check if backend can connect to database
docker logs neurolynx_backend
```
Look for "Database connected successfully" message.

#### Test Neo4j:
1. Open http://localhost:7474
2. Login with neo4j/neurolynx123
3. Run: `CALL db.ping()`

### Step 4: Initialize AI Models (Optional)

```bash
# Download AI models (this may take several minutes)
docker exec neurolynx_ollama ollama pull llama2:7b-chat
docker exec neurolynx_ollama ollama pull codellama:7b-instruct
```

## 🏃‍♂️ Running the Application

### Method 1: Automated Start (Windows)

```cmd
scripts\dev-start.bat
```

### Method 2: Manual Start

1. **Start Docker Services:**
```bash
docker-compose up -d
```

2. **Start React Development Server:**
```bash
cd frontend-react
npm start
```

### Step-by-Step Startup Process

1. **Start Docker services** (if not already running)
2. **Wait 30 seconds** for databases to initialize
3. **Start React frontend** for development
4. **Access the application** at http://localhost:3000

### Verification Checklist

✅ **Docker containers running:** `docker-compose ps`
✅ **Backend API responding:** http://localhost:8000/health
✅ **Frontend loading:** http://localhost:3000
✅ **Database accessible:** http://localhost:7474 (Neo4j)
✅ **Authentication working:** http://localhost:8080 (Keycloak)

## 🌐 Service URLs & Access Points

| Service | URL | Credentials | Purpose |
|---------|-----|-------------|---------|
| **React Frontend** | http://localhost:3000 | demo/demo | Main application |
| **Backend API** | http://localhost:8000 | - | REST API |
| **API Documentation** | http://localhost:8000/docs | - | Interactive API docs |
| **PostgreSQL** | localhost:5432 | neurolynx/neurolynx123 | Main database |
| **Neo4j Browser** | http://localhost:7474 | neo4j/neurolynx123 | Graph database |
| **Keycloak Admin** | http://localhost:8080 | admin/admin123 | User management |
| **MinIO Console** | http://localhost:9001 | neurolynx/neurolynx123 | File storage |
| **Redis** | localhost:6379 | - | Cache/sessions |

## 🧪 Testing the Setup

### Step 1: Test Frontend Login

1. Go to http://localhost:3000
2. You should see the NeuroLynxEdu login page
3. Login with:
   - Username: `demo`
   - Password: `demo`
4. You should see the dashboard with sample data

### Step 2: Test API Endpoints

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test login endpoint
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=demo&password=demo"
```

### Step 3: Test Database Connections

#### PostgreSQL:
```bash
docker exec -it neurolynx_postgres psql -U neurolynx -d neurolynx_db -c "SELECT version();"
```

#### Neo4j:
```bash
# Open http://localhost:7474 and run:
MATCH (n) RETURN count(n)
```

### Step 4: Test Real-time Features

1. Open browser developer tools (F12)
2. Go to Network tab
3. Navigate through the app
4. Look for WebSocket connections and API calls

## 🚨 Common Issues & Troubleshooting

### Issue: "Port 3000 already in use"

**Symptoms:** React app won't start
**Solution:**
```bash
# Find and kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: "Cannot connect to database"

**Symptoms:** Backend logs show database connection errors
**Solutions:**
1. **Check if PostgreSQL container is running:**
```bash
docker-compose ps postgres
```

2. **Restart PostgreSQL:**
```bash
docker-compose restart postgres
```

3. **Check database logs:**
```bash
docker logs neurolynx_postgres
```

### Issue: "Docker daemon not running"

**Symptoms:** `docker` commands fail
**Solution:**
1. Start Docker Desktop application
2. Wait for the whale icon to appear in system tray
3. Try commands again

### Issue: "Permission denied" (Linux/Mac)

**Symptoms:** Cannot run scripts or access files
**Solution:**
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Fix Docker permissions
sudo usermod -aG docker $USER
# Log out and back in
```

### Issue: "Module not found" in React

**Symptoms:** React app shows import errors
**Solution:**
```bash
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

### Issue: Keycloak not accessible

**Symptoms:** http://localhost:8080 doesn't load
**Solutions:**
1. **Wait longer** - Keycloak takes 2-3 minutes to start
2. **Check logs:**
```bash
docker logs neurolynx_keycloak
```
3. **Restart Keycloak:**
```bash
docker-compose restart keycloak
```

### Issue: Out of memory/disk space

**Symptoms:** Containers crash or won't start
**Solutions:**
```bash
# Clean up Docker
docker system prune -a
docker volume prune

# Increase Docker memory in Docker Desktop settings
```

## 🔍 Debugging & Logs

### View All Service Logs
```bash
docker-compose logs
```

### View Specific Service Logs
```bash
docker logs neurolynx_backend
docker logs neurolynx_frontend
docker logs neurolynx_postgres
docker logs neurolynx_keycloak
```

### Follow Live Logs
```bash
docker-compose logs -f backend
```

### Check Service Health
```bash
# Check which containers are running
docker-compose ps

# Check resource usage
docker stats
```

## ✅ Final Verification Checklist

Before considering your setup complete, verify:

- [ ] All Docker containers are running (`docker-compose ps`)
- [ ] Frontend loads at http://localhost:3000
- [ ] Can login with demo/demo credentials
- [ ] Backend API responds at http://localhost:8000/health
- [ ] API documentation loads at http://localhost:8000/docs
- [ ] PostgreSQL accessible (check logs for connection success)
- [ ] Neo4j browser loads at http://localhost:7474
- [ ] Keycloak admin console loads at http://localhost:8080
- [ ] No error messages in any service logs

## 🎯 Next Steps After Setup

Once everything is running:

1. **Explore the Application:**
   - Navigate through different pages
   - Test the AI chatbot (mock responses)
   - View the EEG monitoring dashboard (sample data)

2. **Development Workflow:**
   - Make changes to React components in `frontend-react/src/`
   - Modify backend API in `backend/app/`
   - Changes auto-reload in development mode

3. **Add Real Data:**
   - Configure Keycloak with real users
   - Connect real EEG devices
   - Integrate with actual AI models

4. **Customize Configuration:**
   - Update `.env` file with your settings
   - Modify Docker Compose for your needs
   - Add your own courses and content

## 📚 Additional Resources

- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **React Documentation:** https://react.dev/
- **Docker Documentation:** https://docs.docker.com/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/
- **Neo4j Documentation:** https://neo4j.com/docs/
- **Keycloak Documentation:** https://www.keycloak.org/documentation

## 🆘 Getting Help

If you encounter issues not covered in this guide:

1. **Check the logs** using the debugging commands above
2. **Search for error messages** in the project documentation
3. **Review the Docker Compose file** for service configurations
4. **Check GitHub issues** if using a repository
5. **Verify all prerequisites** are correctly installed

---

**Congratulations!** 🎉 You now have a fully functional NeuroLynxEdu AI development environment running on your local machine. The platform combines cutting-edge neurotechnology with AI to create personalized learning experiences.