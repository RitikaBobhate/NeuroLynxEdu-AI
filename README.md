# NeuroLynxEdu AI

An AI-powered personalized education platform that adapts to brain activity, focus levels, and learning patterns using EEG integration and advanced machine learning.

## 🧠 Project Overview

NeuroLynxEdu AI combines cutting-edge neurotechnology with artificial intelligence to create truly personalized learning experiences. The platform uses real-time EEG data to monitor attention and focus levels, adapting content difficulty and presentation in real-time.

### Key Features

- **🔬 EEG-Based Learning Adaptation**: Real-time brainwave analysis for attention tracking
- **🤖 AI Tutoring System**: Conversational AI tutors with personalized explanations
- **📊 Adaptive Learning Paths**: Dynamic curriculum adjustment based on neural feedback
- **🕸️ Knowledge Graph Integration**: Graph Neural Networks for mapping learning relationships
- **📈 Real-time Analytics**: Comprehensive learning pattern analysis
- **🥽 VR/AR Learning**: Immersive educational experiences using WebXR
- **👥 Multi-role Support**: Students, educators, and administrators

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- TailwindCSS for styling
- Redux Toolkit for state management
- Chart.js for data visualization
- WebXR for VR/AR experiences

**Backend:**
- FastAPI (Python) for REST API
- WebSockets for real-time communication
- Celery + Redis for task queuing
- Keycloak for authentication

**Databases:**
- PostgreSQL for relational data
- Neo4j for knowledge graphs
- Redis for caching

**AI/ML Stack:**
- Hugging Face Transformers
- PyTorch for custom models
- Ollama for local LLM hosting
- DGL for Graph Neural Networks

**EEG Integration:**
- OpenBCI hardware support
- BrainFlow for signal processing
- MNE-Python for EEG analysis

**Deployment:**
- Docker & Docker Compose
- MinIO for object storage
- Prometheus + Grafana for monitoring

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for frontend development)
- Python 3.11+ (for backend development)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/neurolynx-edu-ai.git
   cd neurolynx-edu-ai
   ```

2. **Run the setup script:**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Start the development environment:**
   ```bash
   chmod +x scripts/dev-start.sh
   ./scripts/dev-start.sh
   ```

### Manual Setup

1. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Start services with Docker:**
   ```bash
   docker-compose up -d --build
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend-react
   npm install
   npm start
   ```

## 🌐 Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432
- **Neo4j Browser**: http://localhost:7474
- **Keycloak Admin**: http://localhost:8080
- **MinIO Console**: http://localhost:9001
- **Redis**: localhost:6379

## 📁 Project Structure

```
neurolynx-edu-ai/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   └── main.py         # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/               # Original Alpine.js prototype
├── frontend-react/         # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   └── hooks/          # Custom hooks
│   ├── package.json
│   └── Dockerfile.dev
├── database/               # Database initialization
│   └── init/               # SQL initialization scripts
├── deployment/             # Deployment configurations
├── scripts/                # Setup and utility scripts
├── docker-compose.yml      # Docker services
└── README.md
```

## 🔧 Development

### Backend Development

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run FastAPI development server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Development

1. **Install Node.js dependencies:**
   ```bash
   cd frontend-react
   npm install
   ```

2. **Start React development server:**
   ```bash
   npm start
   ```

### Database Management

**PostgreSQL:**
```bash
# Connect to PostgreSQL
docker exec -it neurolynx_postgres psql -U neurolynx -d neurolynx_db

# Run migrations
docker exec neurolynx_backend alembic upgrade head
```

**Neo4j:**
```bash
# Access Neo4j browser at http://localhost:7474
# Username: neo4j, Password: neurolynx123
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend-react
npm test
```

## 📊 EEG Integration

### Supported Devices
- OpenBCI Cyton (8-channel)
- OpenBCI Ganglion (4-channel)
- NeuroSky MindWave (single-channel)

### Setup EEG Device
1. Connect your EEG device via Bluetooth or USB
2. Configure device settings in the Settings page
3. Run calibration process
4. Start real-time monitoring

## 🤖 AI Features

### Local LLM Setup
```bash
# Pull Ollama models
docker exec neurolynx_ollama ollama pull llama2:7b-chat
docker exec neurolynx_ollama ollama pull codellama:7b-instruct
```

### Knowledge Graph
The platform uses Neo4j to create dynamic knowledge graphs that map:
- Learning concepts and relationships
- Student knowledge mastery
- Optimal learning paths
- Content recommendations

## 🔐 Authentication

The platform uses Keycloak for authentication and authorization:

1. **Access Keycloak Admin**: http://localhost:8080
2. **Default credentials**: admin/admin123
3. **Configure realm**: Create 'neurolynx' realm
4. **Setup client**: Create 'neurolynx-api' client

## 📈 Monitoring

### Application Metrics
- Real-time EEG data streaming
- Learning session analytics
- Focus and attention tracking
- Performance optimization

### System Monitoring
- Docker container health
- Database performance
- API response times
- Resource utilization

## 🚀 Deployment

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
See `.env.example` for all required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API docs at `/docs`

## 🎯 Roadmap

- [ ] Complete React frontend migration
- [ ] Implement real EEG device integration
- [ ] Add VR/AR learning modules
- [ ] Develop mobile application
- [ ] Advanced AI tutoring features
- [ ] Multi-language support
- [ ] Cloud deployment options

---

**NeuroLynxEdu AI** - Revolutionizing education through neurotechnology and artificial intelligence.