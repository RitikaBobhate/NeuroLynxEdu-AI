-- NeuroLynxEdu AI Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(255),
    learning_preferences JSONB DEFAULT '{}',
    eeg_device_id VARCHAR(50),
    eeg_device_connected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- User statistics
CREATE TABLE IF NOT EXISTS user_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_courses INTEGER DEFAULT 0,
    completed_courses INTEGER DEFAULT 0,
    total_study_time INTEGER DEFAULT 0,
    learning_streak INTEGER DEFAULT 0,
    avg_focus_level FLOAT DEFAULT 0.0,
    avg_attention_level FLOAT DEFAULT 0.0,
    total_ai_sessions INTEGER DEFAULT 0,
    knowledge_mastery_score FLOAT DEFAULT 0.0,
    learning_efficiency FLOAT DEFAULT 0.0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) DEFAULT 'beginner',
    estimated_duration INTEGER DEFAULT 0,
    thumbnail_url VARCHAR(255),
    rating FLOAT DEFAULT 0.0,
    tags TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course enrollments
CREATE TABLE IF NOT EXISTS course_enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    progress FLOAT DEFAULT 0.0,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- EEG sessions
CREATE TABLE IF NOT EXISTS eeg_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id),
    device_id VARCHAR(50),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    avg_focus_level FLOAT,
    avg_attention_level FLOAT,
    avg_meditation_level FLOAT,
    signal_quality FLOAT,
    session_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning sessions
CREATE TABLE IF NOT EXISTS learning_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id),
    eeg_session_id INTEGER REFERENCES eeg_sessions(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    completion_rate FLOAT DEFAULT 0.0,
    performance_score FLOAT,
    ai_interactions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI chat sessions
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    context_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI chat messages
CREATE TABLE IF NOT EXISTS ai_chat_messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) REFERENCES ai_chat_sessions(session_id) ON DELETE CASCADE,
    sender VARCHAR(10) NOT NULL, -- 'user' or 'ai'
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Insert sample data
INSERT INTO courses (title, description, difficulty, estimated_duration, rating, tags) VALUES
('Neuro-Symbolic AI', 'Master hybrid AI architectures combining neural networks and symbolic reasoning', 'advanced', 480, 4.8, ARRAY['AI', 'Neural Networks', 'Symbolic AI']),
('EEG & BCI Integration', 'Learn to integrate brain-computer interfaces with adaptive learning systems', 'intermediate', 360, 4.9, ARRAY['EEG', 'BCI', 'Neuroscience']),
('Transformer Architectures', 'Advanced course on GPT, BERT and modern NLP architectures', 'advanced', 420, 4.7, ARRAY['NLP', 'Transformers', 'Deep Learning']);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_eeg_sessions_user_id ON eeg_sessions(user_id);
CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX idx_ai_chat_messages_session_id ON ai_chat_messages(session_id);