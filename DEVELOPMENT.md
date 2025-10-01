# NeuroLynxEdu AI - Development Guide

## 🎯 Current Status & Next Steps

### ✅ Completed Foundation
- **Project Structure**: Complete directory structure with all necessary folders
- **Backend API**: FastAPI with core endpoints (auth, users, courses, analytics, EEG)
- **Database Setup**: PostgreSQL + Neo4j with initialization scripts
- **Docker Environment**: Complete docker-compose setup with all services
- **React Frontend**: Basic structure with Redux, routing, and core components
- **Authentication**: Mock authentication system ready for Keycloak integration
- **UI Design**: Preserved excellent existing design system

### 🔄 Integration Strategy
We're using a **hybrid approach** that preserves your excellent existing UI while migrating to a modern React architecture:

1. **Existing Alpine.js Frontend** (`frontend/`) - Kept as design reference
2. **New React Frontend** (`frontend-react/`) - Modern implementation
3. **Gradual Migration** - Components match existing design exactly

## 🚀 Quick Start

### Option 1: Windows (Recommended)
```cmd
# Run the setup script
scripts\setup.bat

# Start development environment
scripts\dev-start.bat
```

### Option 2: Manual Setup
```bash
# 1. Create environment file
copy .env.example .env

# 2. Start all services
docker-compose up -d --build

# 3. Install React dependencies
cd frontend-react
npm install

# 4. Start React development server
npm start
```

## 🌐 Service Access

After running setup, access these services:

- **React Frontend**: http://localhost:3000
- **Original Frontend**: Open `frontend/index.html` in browser
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432 (user: neurolynx, pass: neurolynx123)
- **Neo4j Browser**: http://localhost:7474 (user: neo4j, pass: neurolynx123)
- **Keycloak**: http://localhost:8080 (admin: admin, pass: admin123)
- **MinIO Console**: http://localhost:9001 (user: neurolynx, pass: neurolynx123)

## 🔧 Development Workflow

### Phase 1: Foundation Testing (Current)
1. **Test the setup**:
   ```bash
   # Check all services are running
   docker-compose ps
   
   # Test API endpoints
   curl http://localhost:8000/health
   ```

2. **Login to React app**:
   - Username: `demo`
   - Password: `demo`

3. **Verify database connections**:
   - PostgreSQL: Check tables in `neurolynx_db`
   - Neo4j: Access browser and run `MATCH (n) RETURN n LIMIT 10`

### Phase 2: Backend Enhancement
1. **Replace mock authentication with Keycloak**
2. **Implement real database operations**
3. **Add EEG WebSocket streaming**
4. **Integrate AI/ML models**

### Phase 3: Frontend Development
1. **Add Chart.js visualizations**
2. **Implement real-time EEG data display**
3. **Create AI chatbot component**
4. **Add course content management**

### Phase 4: Advanced Features
1. **EEG device integration**
2. **Knowledge graph visualization**
3. **VR/AR learning modules**
4. **Advanced analytics**

## 📁 Key Files & Directories

### Backend Structure
```
backend/
├── app/
│   ├── api/v1/endpoints/     # API endpoints
│   ├── core/config.py        # Configuration
│   ├── models/               # Database models
│   └── main.py              # FastAPI app
├── requirements.txt          # Python dependencies
└── Dockerfile               # Backend container
```

### Frontend Structure
```
frontend-react/
├── src/
│   ├── components/Layout/    # Layout components
│   ├── pages/               # Page components
│   ├── store/               # Redux store & slices
│   ├── hooks/               # Custom hooks
│   └── App.tsx              # Main app component
├── package.json             # Node dependencies
└── tailwind.config.js       # Tailwind configuration
```

### Database Structure
```
database/
├── init/
│   ├── 01-create-keycloak-db.sql
│   └── 02-create-tables.sql
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - User logout

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `GET /api/v1/users/stats` - Get user statistics

### Courses
- `GET /api/v1/courses/` - List all courses
- `GET /api/v1/courses/{id}` - Get course details
- `POST /api/v1/courses/{id}/enroll` - Enroll in course

### EEG
- `GET /api/v1/eeg/devices` - List EEG devices
- `WebSocket /api/v1/eeg/stream` - Real-time EEG data
- `GET /api/v1/eeg/data/latest` - Latest EEG reading

### Analytics
- `GET /api/v1/analytics/focus-trends` - Focus level trends
- `GET /api/v1/analytics/performance-metrics` - Performance data
- `GET /api/v1/analytics/knowledge-graph` - Knowledge graph data

## 🎨 UI Components

### Design System
The React components exactly match your existing Alpine.js design:

- **Colors**: Primary blue, neuro-purple, neuro-teal, neuro-pink
- **Typography**: Inter font family
- **Components**: Cards, buttons, forms match existing styles
- **Dark Mode**: Fully implemented with localStorage persistence
- **Responsive**: Mobile-first design with sidebar navigation

### Key Components
- `Layout/Layout.tsx` - Main layout wrapper
- `Layout/Sidebar.tsx` - Navigation sidebar
- `Layout/Header.tsx` - Top header with search and user menu
- `pages/Dashboard.tsx` - Dashboard with stats cards
- `pages/Login.tsx` - Login form with gradient background

## 🧠 EEG Integration

### Supported Devices
- OpenBCI Cyton (8-channel)
- OpenBCI Ganglion (4-channel)
- NeuroSky MindWave (single-channel)

### Data Flow
1. **Hardware** → BrainFlow → **Backend Processing**
2. **Backend** → WebSocket → **Frontend Display**
3. **Real-time Analysis** → **Adaptive Learning**

### Implementation Status
- ✅ Mock EEG data generation
- ✅ WebSocket streaming endpoint
- ✅ Redux store for EEG state
- ⏳ Real hardware integration
- ⏳ Signal processing algorithms

## 🤖 AI/ML Features

### Current Implementation
- Mock AI responses in chatbot
- Placeholder knowledge graph endpoints
- Sample learning recommendations

### Planned Features
- **Local LLM**: Ollama integration for AI tutoring
- **Knowledge Graphs**: Neo4j + Graph Neural Networks
- **Adaptive Learning**: Reinforcement learning algorithms
- **Content Generation**: AI-powered course content

## 🔐 Authentication Flow

### Current (Mock)
1. User enters demo/demo credentials
2. Frontend stores mock JWT token
3. All API calls include token header

### Planned (Keycloak)
1. Redirect to Keycloak login
2. Receive OAuth2 token
3. Validate token on backend
4. Store user session

## 📊 Database Schema

### PostgreSQL Tables
- `users` - User accounts and profiles
- `courses` - Course information
- `course_enrollments` - User course enrollments
- `eeg_sessions` - EEG recording sessions
- `learning_sessions` - Learning activity tracking
- `ai_chat_sessions` - AI tutor conversations

### Neo4j Graph
- `User` nodes with learning preferences
- `Course` nodes with content structure
- `Concept` nodes for knowledge mapping
- Relationships for learning paths

## 🧪 Testing

### Backend Testing
```bash
cd backend
pip install pytest pytest-asyncio
pytest
```

### Frontend Testing
```bash
cd frontend-react
npm test
```

### Integration Testing
```bash
# Test API endpoints
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=demo&password=demo"
```

## 🚀 Deployment

### Development
- All services run in Docker containers
- Hot reload enabled for both frontend and backend
- Database data persisted in Docker volumes

### Production (Planned)
- Multi-stage Docker builds
- Environment-specific configurations
- SSL/TLS termination
- Load balancing
- Monitoring and logging

## 🔧 Troubleshooting

### Common Issues

1. **Docker services not starting**:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

2. **React app not loading**:
   ```bash
   cd frontend-react
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

3. **Database connection errors**:
   - Check if PostgreSQL container is running
   - Verify credentials in .env file
   - Check port conflicts

4. **API endpoints returning 404**:
   - Verify backend container is running
   - Check FastAPI logs: `docker logs neurolynx_backend`

### Logs
```bash
# View all service logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs postgres
docker-compose logs neo4j
```

## 📈 Performance Optimization

### Backend
- Use async/await for database operations
- Implement connection pooling
- Add Redis caching for frequent queries
- Optimize EEG data processing

### Frontend
- Lazy load components
- Implement virtual scrolling for large lists
- Optimize chart rendering
- Use React.memo for expensive components

## 🤝 Contributing

### Code Style
- **Backend**: Black formatter, isort imports
- **Frontend**: Prettier, ESLint
- **Commits**: Conventional commit messages

### Development Process
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

## 📚 Learning Resources

### Technologies Used
- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **TailwindCSS**: https://tailwindcss.com/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Neo4j**: https://neo4j.com/docs/
- **Docker**: https://docs.docker.com/

### EEG & Neuroscience
- **OpenBCI**: https://docs.openbci.com/
- **BrainFlow**: https://brainflow.readthedocs.io/
- **MNE-Python**: https://mne.tools/stable/

---

## 🎯 Immediate Next Steps

1. **Run the setup** and verify all services are working
2. **Test the React application** with demo credentials
3. **Explore the API documentation** at http://localhost:8000/docs
4. **Review the existing Alpine.js frontend** for design reference
5. **Start implementing real backend functionality**

The foundation is solid and ready for development! 🚀