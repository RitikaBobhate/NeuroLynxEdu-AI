# NeuroLynxEdu AI Backend

A comprehensive FastAPI-based backend for an AI-powered personalized education platform with EEG integration.

## Features

### Core Features
- **EEG Integration**: Real-time brainwave monitoring and analysis
- **AI Tutoring**: Adaptive AI tutor with EEG-based personalization
- **Learning Analytics**: Comprehensive learning progress tracking
- **Course Management**: Advanced course and content management
- **Real-time Communication**: WebSocket support for live features
- **Authentication & Authorization**: JWT-based auth with role management

### Technical Features
- **Database Integration**: PostgreSQL, Neo4j, Redis support
- **Comprehensive Logging**: Structured logging with specialized loggers
- **Error Handling**: Custom exception handling and validation
- **Performance Monitoring**: Built-in metrics and health checks
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

## Architecture

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/          # API endpoint modules
│   │       │   ├── auth.py         # Authentication endpoints
│   │       │   ├── users.py        # User management
│   │       │   ├── courses.py      # Course management
│   │       │   ├── analytics.py    # Learning analytics
│   │       │   ├── eeg_demo.py     # EEG demonstration
│   │       │   ├── ai_tutor.py     # AI tutoring system
│   │       │   └── websockets.py   # WebSocket endpoints
│   │       └── api.py              # API router configuration
│   ├── core/
│   │   ├── auth.py                 # Authentication utilities
│   │   ├── config.py               # Configuration settings
│   │   ├── database.py             # Database configuration
│   │   ├── exceptions.py           # Custom exception handling
│   │   └── logging.py              # Logging configuration
│   ├── models/
│   │   ├── user.py                 # User database models
│   │   ├── course.py               # Course database models
│   │   ├── eeg.py                  # EEG data models
│   │   ├── analytics.py            # Analytics models
│   │   └── ai_tutor.py             # AI tutor models
│   ├── services/
│   │   ├── eeg_simulator.py        # EEG data simulation
│   │   ├── eeg_processor.py        # EEG data processing
│   │   ├── ai_tutor.py             # AI tutoring service
│   │   ├── analytics_engine.py     # Analytics processing
│   │   └── websocket_manager.py    # WebSocket management
│   └── main.py                     # FastAPI application
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

## Database Models

### User Management
- **User**: Core user information and preferences
- **UserStats**: Learning statistics and performance metrics
- **UserLearningProfile**: Personalized learning preferences

### Course System
- **Course**: Course information and metadata
- **CourseContent**: Individual content pieces within courses
- **Enrollment**: User course enrollments
- **Progress**: Detailed progress tracking per content item
- **CourseReview**: User reviews and ratings

### EEG Integration
- **EEGSession**: EEG monitoring sessions
- **EEGReading**: Individual EEG data points
- **EEGCalibration**: User-specific EEG calibration data
- **EEGAnalysis**: Processed EEG insights and analysis
- **EEGDevice**: EEG device information and status

### AI Tutoring
- **TutorSession**: AI tutoring sessions
- **TutorMessage**: Chat messages between user and AI tutor
- **KnowledgeNode**: Knowledge graph nodes for concepts
- **LearningPath**: Personalized learning pathways
- **UserKnowledgeState**: Individual knowledge mastery tracking

### Analytics
- **LearningSession**: Learning session tracking
- **FocusMetric**: Real-time focus and attention metrics
- **LearningOutcome**: Learning achievement tracking
- **PerformanceAnalytics**: Aggregated performance data

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /login` - User authentication
- `POST /register` - User registration
- `GET /me` - Get current user info
- `PUT /me` - Update user profile
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token

### Users (`/api/v1/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /stats` - Get user statistics

### Courses (`/api/v1/courses`)
- `GET /` - List courses with filtering
- `GET /{course_id}` - Get course details
- `POST /{course_id}/enroll` - Enroll in course
- `PUT /{course_id}/progress` - Update progress
- `GET /{course_id}/content` - Get course content
- `POST /{course_id}/ai-tutor/start` - Start AI tutor for course
- `GET /{course_id}/recommendations` - Get personalized recommendations
- `GET /{course_id}/analytics` - Get course analytics
- `POST /create` - Create new course (educator only)
- `GET /categories` - Get course categories

### Analytics (`/api/v1/analytics`)
- `GET /dashboard` - Comprehensive analytics dashboard
- `GET /focus-trends` - Focus level trends
- `GET /performance-metrics` - Performance metrics
- `GET /sessions` - Learning sessions
- `GET /knowledge-graph` - Knowledge graph representation
- `GET /recommendations` - Learning recommendations
- `GET /eeg-analysis/{session_id}` - EEG session analysis
- `GET /learning-patterns` - Learning pattern analysis

### EEG System (`/api/v1/eeg`)
- `GET /devices` - Available EEG devices
- `POST /devices/{device_id}/connect` - Connect EEG device
- `POST /calibration/start` - Start EEG calibration
- `GET /data/latest` - Latest EEG reading
- `GET /data/history` - Historical EEG data
- `POST /session/start` - Start EEG session
- `POST /session/{session_id}/stop` - Stop EEG session
- `GET /demo/scenarios` - Demo scenarios
- `POST /demo/scenario/{scenario_id}/start` - Start demo scenario
- `GET /analytics/focus-patterns` - Focus pattern analytics
- `GET /status` - EEG system status

### AI Tutor (`/api/v1/ai-tutor`)
- `POST /session/start` - Start tutoring session
- `POST /session/{session_id}/message` - Send message to tutor
- `GET /session/{session_id}/status` - Get session status
- `POST /session/{session_id}/end` - End tutoring session
- `GET /sessions/history` - Tutoring history
- `GET /topics` - Available tutoring topics
- `GET /knowledge-assessment` - Knowledge assessments
- `POST /knowledge-assessment/{topic}/submit` - Submit assessment
- `GET /adaptive-features` - Adaptive feature information

### WebSockets (`/api/v1/ws`)
- `WS /eeg/{user_id}` - Real-time EEG data stream
- `WS /tutor/{session_id}` - AI tutor chat
- `WS /analytics/{user_id}` - Real-time analytics feed
- `WS /notifications/{user_id}` - Notification stream
- `GET /stats` - WebSocket connection statistics
- `POST /broadcast` - Broadcast system message

## Services

### EEG Simulator (`eeg_simulator.py`)
- Realistic brainwave pattern generation
- Multiple user profile types (focused, ADHD, average, gifted)
- Content difficulty adaptation
- Learning scenario simulation
- Session tracking and analytics

### EEG Processor (`eeg_processor.py`)
- Real-time EEG data processing
- Learning state classification
- Attention trend analysis
- Cognitive load assessment
- Alert generation
- Comprehensive session analysis

### AI Tutor (`ai_tutor.py`)
- Personalized tutoring sessions
- EEG-adaptive responses
- Learning style accommodation
- Knowledge state tracking
- Context-aware explanations
- Session analytics

### Analytics Engine (`analytics_engine.py`)
- Comprehensive user analytics
- Performance trend analysis
- Learning pattern recognition
- Behavioral insights
- Recommendation generation
- Goal progress tracking

### WebSocket Manager (`websocket_manager.py`)
- Multi-type connection management
- Real-time data streaming
- Message routing and broadcasting
- Connection health monitoring
- Session state management

## Configuration

### Environment Variables
```bash
# Database Configuration
POSTGRES_SERVER=localhost
POSTGRES_USER=neurolynx
POSTGRES_PASSWORD=neurolynx123
POSTGRES_DB=neurolynx_db
POSTGRES_PORT=5432

# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=neurolynx123

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# EEG Configuration
EEG_SAMPLING_RATE=250
EEG_BUFFER_SIZE=1000

# External Services
KEYCLOAK_SERVER_URL=http://localhost:8080
KEYCLOAK_REALM=neurolynx
KEYCLOAK_CLIENT_ID=neurolynx-api
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Database Setup**
   ```bash
   # Start PostgreSQL, Neo4j, and Redis
   docker-compose up -d
   ```

3. **Environment Configuration**
   ```bash
   # Copy and configure environment variables
   cp .env.example .env
   ```

4. **Run Application**
   ```bash
   # Development
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

   # Production
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

## API Documentation

- **Swagger UI**: `http://localhost:8000/api/v1/docs`
- **ReDoc**: `http://localhost:8000/api/v1/redoc`
- **OpenAPI JSON**: `http://localhost:8000/api/v1/openapi.json`

## Logging

The application uses comprehensive logging with specialized loggers:

- **Main Log**: `logs/neurolynx.log` - All application events
- **Error Log**: `logs/errors.log` - Error events only
- **EEG Log**: `logs/eeg_data.log` - EEG-related events
- **Security Log**: `logs/security.log` - Authentication and authorization events
- **Analytics Log**: `logs/analytics.log` - Analytics processing events

## Health Checks

- **Basic Health**: `GET /health`
- **Detailed Metrics**: `GET /metrics`
- **Component Status**: Included in health check response

## Error Handling

The application provides comprehensive error handling with:

- Custom exception types for different error categories
- Structured error responses with error codes
- Detailed logging of all errors
- Graceful fallbacks for service failures

## Demo Mode

The backend includes comprehensive demo functionality:

- Simulated EEG data generation
- Mock AI tutor responses
- Sample analytics data
- Demo user accounts
- Fallback responses when databases are unavailable

## Security Features

- JWT-based authentication
- Role-based authorization
- Request validation
- CORS configuration
- Security event logging
- Rate limiting support

## Performance Monitoring

- Request/response logging
- Performance metrics collection
- WebSocket connection monitoring
- Database connection health checks
- Component status tracking

## WebSocket Features

Real-time features include:

- Live EEG data streaming
- AI tutor chat interface
- Analytics updates
- System notifications
- Connection management

## Integration Points

The backend is designed to integrate with:

- React/Vue.js frontends
- EEG hardware devices
- External authentication systems (Keycloak)
- Analytics platforms
- Monitoring systems

## Development Notes

- All endpoints include proper error handling and validation
- Database operations include fallback demo data
- WebSocket connections are properly managed
- Logging provides comprehensive debugging information
- Code is structured for easy testing and maintenance

## Production Considerations

- Configure proper database connections
- Set secure JWT secrets
- Enable production logging levels
- Configure external authentication
- Set up monitoring and alerting
- Configure proper CORS origins
- Use environment-specific configurations

This backend provides a robust foundation for an AI-powered educational platform with advanced EEG integration and real-time adaptive learning capabilities.