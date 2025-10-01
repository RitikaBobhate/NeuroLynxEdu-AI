"""
Demo Data Creation Script for NeuroLynxEdu AI
Creates comprehensive demo data for professor presentation
"""

import asyncio
import json
import random
from datetime import datetime, timedelta
from typing import Dict, List
import uuid

class DemoDataGenerator:
    """Generate realistic demo data for all system components"""
    
    def __init__(self):
        self.users = []
        self.courses = []
        self.learning_sessions = []
        self.ai_conversations = []
        self.knowledge_graph = []
        self.analytics_data = []
        
    def create_demo_users(self) -> List[Dict]:
        """Create diverse demo user accounts"""
        
        users = [
            {
                "id": "demo_student_1",
                "username": "alice_chen",
                "email": "alice.chen@university.edu",
                "full_name": "Alice Chen",
                "role": "student",
                "profile": {
                    "learning_style": "visual",
                    "eeg_profile": "student_focused",
                    "grade_level": "undergraduate",
                    "major": "Computer Science",
                    "year": 3,
                    "gpa": 3.7,
                    "study_preferences": {
                        "preferred_time": "morning",
                        "session_length": 45,
                        "break_frequency": 25
                    }
                },
                "stats": {
                    "total_study_hours": 156,
                    "courses_completed": 8,
                    "current_courses": 4,
                    "avg_attention_score": 75.2,
                    "avg_focus_score": 72.8,
                    "learning_streak": 12
                },
                "created_at": "2024-01-10T08:00:00Z",
                "last_active": "2024-01-20T14:30:00Z"
            },
            {
                "id": "demo_student_2",
                "username": "marcus_johnson",
                "email": "marcus.j@university.edu",
                "full_name": "Marcus Johnson",
                "role": "student",
                "profile": {
                    "learning_style": "kinesthetic",
                    "eeg_profile": "student_adhd",
                    "grade_level": "undergraduate",
                    "major": "Psychology",
                    "year": 2,
                    "gpa": 3.2,
                    "study_preferences": {
                        "preferred_time": "afternoon",
                        "session_length": 30,
                        "break_frequency": 15
                    }
                },
                "stats": {
                    "total_study_hours": 89,
                    "courses_completed": 4,
                    "current_courses": 5,
                    "avg_attention_score": 58.4,
                    "avg_focus_score": 52.1,
                    "learning_streak": 3
                },
                "created_at": "2024-01-05T10:15:00Z",
                "last_active": "2024-01-20T16:45:00Z"
            },
            {
                "id": "demo_student_3",
                "username": "sarah_williams",
                "email": "sarah.w@university.edu",
                "full_name": "Sarah Williams",
                "role": "student",
                "profile": {
                    "learning_style": "auditory",
                    "eeg_profile": "student_average",
                    "grade_level": "graduate",
                    "major": "Neuroscience",
                    "year": 1,
                    "gpa": 3.9,
                    "study_preferences": {
                        "preferred_time": "evening",
                        "session_length": 60,
                        "break_frequency": 30
                    }
                },
                "stats": {
                    "total_study_hours": 203,
                    "courses_completed": 12,
                    "current_courses": 3,
                    "avg_attention_score": 82.1,
                    "avg_focus_score": 79.6,
                    "learning_streak": 18
                },
                "created_at": "2023-12-15T09:30:00Z",
                "last_active": "2024-01-20T20:15:00Z"
            },
            {
                "id": "demo_educator_1",
                "username": "prof_martinez",
                "email": "dr.martinez@university.edu",
                "full_name": "Dr. Elena Martinez",
                "role": "educator",
                "profile": {
                    "department": "Computer Science",
                    "title": "Associate Professor",
                    "specialization": ["Machine Learning", "Neural Networks", "AI Ethics"],
                    "years_experience": 8,
                    "courses_taught": 15
                },
                "stats": {
                    "active_courses": 3,
                    "total_students": 127,
                    "avg_course_rating": 4.7,
                    "research_papers": 23
                },
                "created_at": "2023-08-20T12:00:00Z",
                "last_active": "2024-01-20T11:30:00Z"
            },
            {
                "id": "demo_admin_1",
                "username": "admin_system",
                "email": "admin@neurolynx.edu",
                "full_name": "System Administrator",
                "role": "admin",
                "profile": {
                    "permissions": ["user_management", "system_config", "analytics_access", "course_management"],
                    "department": "IT Services"
                },
                "created_at": "2023-06-01T00:00:00Z",
                "last_active": "2024-01-20T08:00:00Z"
            }
        ]
        
        self.users = users
        return users
    
    def create_demo_courses(self) -> List[Dict]:
        """Create comprehensive course catalog"""
        
        courses = [
            {
                "id": "cs_ml_101",
                "title": "Introduction to Machine Learning",
                "description": "Fundamental concepts of machine learning including supervised and unsupervised learning, neural networks, and practical applications.",
                "instructor_id": "demo_educator_1",
                "instructor_name": "Dr. Elena Martinez",
                "category": "Computer Science",
                "level": "intermediate",
                "duration_weeks": 12,
                "estimated_hours": 120,
                "modules": [
                    {
                        "id": "ml_module_1",
                        "title": "Introduction to ML Concepts",
                        "description": "Basic terminology and types of machine learning",
                        "order": 1,
                        "estimated_time": 180,  # minutes
                        "content_type": "video_lecture",
                        "difficulty": 0.3,
                        "engagement_score": 0.8,
                        "topics": ["supervised learning", "unsupervised learning", "reinforcement learning"]
                    },
                    {
                        "id": "ml_module_2",
                        "title": "Linear Regression and Classification",
                        "description": "Understanding linear models for prediction and classification",
                        "order": 2,
                        "estimated_time": 240,
                        "content_type": "interactive_tutorial",
                        "difficulty": 0.5,
                        "engagement_score": 0.7,
                        "topics": ["linear regression", "logistic regression", "gradient descent"]
                    },
                    {
                        "id": "ml_module_3",
                        "title": "Neural Networks Fundamentals",
                        "description": "Introduction to artificial neural networks and deep learning",
                        "order": 3,
                        "estimated_time": 300,
                        "content_type": "hands_on_lab",
                        "difficulty": 0.8,
                        "engagement_score": 0.9,
                        "topics": ["perceptrons", "backpropagation", "activation functions"]
                    }
                ],
                "enrollment_count": 89,
                "rating": 4.6,
                "prerequisites": ["basic_programming", "statistics_101"],
                "learning_objectives": [
                    "Understand fundamental ML concepts",
                    "Implement basic ML algorithms",
                    "Evaluate model performance",
                    "Apply ML to real-world problems"
                ]
            },
            {
                "id": "neuro_101",
                "title": "Cognitive Neuroscience Fundamentals",
                "description": "Explore the biological basis of cognition, learning, and memory through modern neuroscience research.",
                "instructor_id": "demo_educator_1",
                "instructor_name": "Dr. Elena Martinez",
                "category": "Neuroscience",
                "level": "beginner",
                "duration_weeks": 10,
                "estimated_hours": 80,
                "modules": [
                    {
                        "id": "neuro_module_1",
                        "title": "Brain Structure and Function",
                        "description": "Overview of brain anatomy and basic neural processes",
                        "order": 1,
                        "estimated_time": 150,
                        "content_type": "interactive_3d",
                        "difficulty": 0.4,
                        "engagement_score": 0.9,
                        "topics": ["neurons", "synapses", "brain regions"]
                    },
                    {
                        "id": "neuro_module_2",
                        "title": "Learning and Memory Systems",
                        "description": "How the brain encodes, stores, and retrieves information",
                        "order": 2,
                        "estimated_time": 200,
                        "content_type": "case_studies",
                        "difficulty": 0.6,
                        "engagement_score": 0.8,
                        "topics": ["hippocampus", "working memory", "long-term potentiation"]
                    }
                ],
                "enrollment_count": 67,
                "rating": 4.8,
                "prerequisites": ["biology_basics"],
                "learning_objectives": [
                    "Understand brain structure and function",
                    "Explain neural basis of learning",
                    "Analyze memory formation processes"
                ]
            },
            {
                "id": "ai_ethics_201",
                "title": "AI Ethics and Society",
                "description": "Critical examination of ethical implications of artificial intelligence in modern society.",
                "instructor_id": "demo_educator_1",
                "instructor_name": "Dr. Elena Martinez",
                "category": "Ethics",
                "level": "advanced",
                "duration_weeks": 8,
                "estimated_hours": 60,
                "modules": [
                    {
                        "id": "ethics_module_1",
                        "title": "Bias in AI Systems",
                        "description": "Understanding and mitigating algorithmic bias",
                        "order": 1,
                        "estimated_time": 120,
                        "content_type": "discussion_forum",
                        "difficulty": 0.7,
                        "engagement_score": 0.6,
                        "topics": ["algorithmic bias", "fairness metrics", "bias mitigation"]
                    }
                ],
                "enrollment_count": 34,
                "rating": 4.9,
                "prerequisites": ["cs_ml_101"],
                "learning_objectives": [
                    "Identify ethical issues in AI",
                    "Evaluate bias in algorithms",
                    "Propose ethical AI solutions"
                ]
            }
        ]
        
        self.courses = courses
        return courses
    
    def create_learning_sessions(self) -> List[Dict]:
        """Create realistic learning session data"""
        
        sessions = []
        
        # Generate sessions for the past 30 days
        for day in range(30):
            date = datetime.now() - timedelta(days=day)
            
            # Each user has 1-3 sessions per day
            for user in self.users[:3]:  # Only students
                num_sessions = random.randint(0, 3)
                
                for session_num in range(num_sessions):
                    session_start = date.replace(
                        hour=random.randint(8, 20),
                        minute=random.randint(0, 59),
                        second=0,
                        microsecond=0
                    )
                    
                    duration = random.randint(15, 90)  # 15-90 minutes
                    course = random.choice(self.courses)
                    module = random.choice(course["modules"])
                    
                    # Generate EEG-based metrics
                    base_attention = 60 + random.gauss(0, 15)
                    base_focus = 55 + random.gauss(0, 12)
                    
                    # Adjust based on user profile
                    if user["profile"]["eeg_profile"] == "student_focused":
                        base_attention += 15
                        base_focus += 12
                    elif user["profile"]["eeg_profile"] == "student_adhd":
                        base_attention -= 20
                        base_focus -= 18
                    
                    session = {
                        "id": f"session_{user['id']}_{session_start.strftime('%Y%m%d_%H%M%S')}",
                        "user_id": user["id"],
                        "course_id": course["id"],
                        "module_id": module["id"],
                        "start_time": session_start.isoformat(),
                        "end_time": (session_start + timedelta(minutes=duration)).isoformat(),
                        "duration_minutes": duration,
                        "content_type": module["content_type"],
                        "eeg_metrics": {
                            "avg_attention": max(10, min(100, base_attention)),
                            "avg_focus": max(10, min(100, base_focus)),
                            "peak_attention": max(10, min(100, base_attention + random.randint(5, 20))),
                            "attention_stability": random.randint(60, 95),
                            "focus_episodes": random.randint(2, 8),
                            "distraction_events": random.randint(0, 5)
                        },
                        "learning_metrics": {
                            "completion_rate": random.randint(70, 100),
                            "quiz_score": random.randint(60, 95) if random.random() > 0.3 else None,
                            "time_on_task": random.randint(80, 98),
                            "interaction_count": random.randint(5, 25)
                        },
                        "adaptive_actions": [
                            {
                                "timestamp": (session_start + timedelta(minutes=random.randint(5, duration-5))).isoformat(),
                                "action": "difficulty_adjustment",
                                "reason": "low_attention_detected",
                                "details": "Reduced content difficulty from 0.7 to 0.5"
                            }
                        ] if random.random() > 0.6 else []
                    }
                    
                    sessions.append(session)
        
        self.learning_sessions = sessions
        return sessions
    
    def create_ai_conversations(self) -> List[Dict]:
        """Create sample AI tutoring conversations"""
        
        conversations = [
            {
                "id": "conv_001",
                "user_id": "demo_student_1",
                "course_id": "cs_ml_101",
                "start_time": "2024-01-20T14:30:00Z",
                "status": "completed",
                "messages": [
                    {
                        "timestamp": "2024-01-20T14:30:15Z",
                        "sender": "student",
                        "message": "I'm having trouble understanding gradient descent. Can you explain it simply?"
                    },
                    {
                        "timestamp": "2024-01-20T14:30:45Z",
                        "sender": "ai_tutor",
                        "message": "I'd be happy to help! Think of gradient descent like finding the bottom of a hill while blindfolded. You feel the slope around you and take steps in the steepest downward direction. In machine learning, the 'hill' is your error function, and you're trying to find the lowest error (best model). Would you like me to show you a visual example?",
                        "confidence": 0.92,
                        "personalization_factors": ["visual_learner", "beginner_level"]
                    },
                    {
                        "timestamp": "2024-01-20T14:31:20Z",
                        "sender": "student",
                        "message": "Yes, that would help! And how does the learning rate affect this process?"
                    },
                    {
                        "timestamp": "2024-01-20T14:31:55Z",
                        "sender": "ai_tutor",
                        "message": "Great question! The learning rate controls how big steps you take down the hill. If it's too large, you might overshoot the bottom and bounce around. If it's too small, you'll take forever to reach the bottom. I notice your EEG shows good focus right now - perfect time for a deeper explanation. Let me show you what happens with different learning rates...",
                        "confidence": 0.89,
                        "personalization_factors": ["high_attention", "visual_learner"],
                        "eeg_context": {
                            "attention_level": 78,
                            "focus_level": 82,
                            "optimal_for_learning": True
                        }
                    }
                ],
                "summary": {
                    "topic": "gradient_descent",
                    "understanding_improvement": 0.7,
                    "engagement_score": 0.85,
                    "follow_up_needed": False
                }
            },
            {
                "id": "conv_002",
                "user_id": "demo_student_2",
                "course_id": "neuro_101",
                "start_time": "2024-01-19T16:15:00Z",
                "status": "completed",
                "messages": [
                    {
                        "timestamp": "2024-01-19T16:15:30Z",
                        "sender": "student",
                        "message": "Why do we have different types of memory? Seems complicated."
                    },
                    {
                        "timestamp": "2024-01-19T16:16:10Z",
                        "sender": "ai_tutor",
                        "message": "I can see your attention is a bit scattered right now - let's use a hands-on approach! Think of your brain like a smartphone. You have RAM (working memory) for what you're actively using, and storage (long-term memory) for everything else. Different types serve different purposes. Want to try a quick memory experiment to see this in action?",
                        "confidence": 0.87,
                        "personalization_factors": ["kinesthetic_learner", "low_attention", "interactive_preference"],
                        "eeg_context": {
                            "attention_level": 45,
                            "focus_level": 38,
                            "optimal_for_learning": False,
                            "recommended_action": "interactive_content"
                        }
                    }
                ]
            }
        ]
        
        self.ai_conversations = conversations
        return conversations
    
    def create_knowledge_graph_data(self) -> Dict:
        """Create knowledge graph structure for Neo4j"""
        
        # Nodes
        nodes = [
            # Concepts
            {"id": "ml_concept", "type": "Concept", "name": "Machine Learning", "difficulty": 0.6},
            {"id": "neural_networks", "type": "Concept", "name": "Neural Networks", "difficulty": 0.8},
            {"id": "supervised_learning", "type": "Concept", "name": "Supervised Learning", "difficulty": 0.4},
            {"id": "gradient_descent", "type": "Concept", "name": "Gradient Descent", "difficulty": 0.7},
            {"id": "linear_regression", "type": "Concept", "name": "Linear Regression", "difficulty": 0.5},
            {"id": "brain_anatomy", "type": "Concept", "name": "Brain Anatomy", "difficulty": 0.3},
            {"id": "memory_systems", "type": "Concept", "name": "Memory Systems", "difficulty": 0.6},
            {"id": "neurons", "type": "Concept", "name": "Neurons", "difficulty": 0.4},
            
            # Skills
            {"id": "programming", "type": "Skill", "name": "Programming", "level": "intermediate"},
            {"id": "statistics", "type": "Skill", "name": "Statistics", "level": "beginner"},
            {"id": "critical_thinking", "type": "Skill", "name": "Critical Thinking", "level": "advanced"},
            
            # Learning Objectives
            {"id": "understand_ml", "type": "LearningObjective", "name": "Understand ML Fundamentals"},
            {"id": "implement_algorithms", "type": "LearningObjective", "name": "Implement ML Algorithms"},
            {"id": "analyze_brain_function", "type": "LearningObjective", "name": "Analyze Brain Function"}
        ]
        
        # Relationships
        relationships = [
            {"from": "ml_concept", "to": "supervised_learning", "type": "INCLUDES", "strength": 0.9},
            {"from": "ml_concept", "to": "neural_networks", "type": "INCLUDES", "strength": 0.8},
            {"from": "supervised_learning", "to": "linear_regression", "type": "INCLUDES", "strength": 0.7},
            {"from": "neural_networks", "to": "gradient_descent", "type": "REQUIRES", "strength": 0.8},
            {"from": "linear_regression", "to": "gradient_descent", "type": "USES", "strength": 0.6},
            {"from": "brain_anatomy", "to": "neurons", "type": "INCLUDES", "strength": 0.9},
            {"from": "memory_systems", "to": "brain_anatomy", "type": "BUILDS_ON", "strength": 0.7},
            {"from": "programming", "to": "implement_algorithms", "type": "ENABLES", "strength": 0.9},
            {"from": "statistics", "to": "understand_ml", "type": "SUPPORTS", "strength": 0.8}
        ]
        
        # User knowledge states
        user_knowledge = [
            {
                "user_id": "demo_student_1",
                "concept_masteries": [
                    {"concept_id": "ml_concept", "mastery_level": 0.7, "confidence": 0.8},
                    {"concept_id": "supervised_learning", "mastery_level": 0.8, "confidence": 0.9},
                    {"concept_id": "linear_regression", "mastery_level": 0.6, "confidence": 0.7},
                    {"concept_id": "gradient_descent", "mastery_level": 0.4, "confidence": 0.5}
                ]
            },
            {
                "user_id": "demo_student_2",
                "concept_masteries": [
                    {"concept_id": "brain_anatomy", "mastery_level": 0.5, "confidence": 0.6},
                    {"concept_id": "neurons", "mastery_level": 0.7, "confidence": 0.8},
                    {"concept_id": "memory_systems", "mastery_level": 0.3, "confidence": 0.4}
                ]
            }
        ]
        
        self.knowledge_graph = {
            "nodes": nodes,
            "relationships": relationships,
            "user_knowledge": user_knowledge
        }
        
        return self.knowledge_graph
    
    def create_analytics_data(self) -> Dict:
        """Create comprehensive analytics data"""
        
        analytics = {
            "platform_overview": {
                "total_users": 127,
                "active_users_today": 45,
                "total_courses": 23,
                "total_learning_hours": 2847,
                "avg_session_duration": 42.3,
                "completion_rate": 78.5,
                "user_satisfaction": 4.6
            },
            "eeg_insights": {
                "avg_attention_score": 68.4,
                "avg_focus_score": 65.2,
                "peak_learning_hours": ["09:00-11:00", "14:00-16:00"],
                "attention_improvement_rate": 12.3,
                "optimal_session_length": 45,
                "break_effectiveness": 23.7
            },
            "learning_effectiveness": {
                "adaptive_interventions": 1247,
                "successful_adaptations": 89.2,
                "knowledge_retention": 84.6,
                "skill_progression_rate": 15.8,
                "personalization_accuracy": 91.3
            },
            "course_performance": [
                {
                    "course_id": "cs_ml_101",
                    "enrollment": 89,
                    "completion_rate": 82.0,
                    "avg_rating": 4.6,
                    "avg_attention": 71.2,
                    "difficulty_rating": 0.7
                },
                {
                    "course_id": "neuro_101",
                    "enrollment": 67,
                    "completion_rate": 91.0,
                    "avg_rating": 4.8,
                    "avg_attention": 76.8,
                    "difficulty_rating": 0.5
                }
            ],
            "real_time_metrics": {
                "current_active_sessions": 12,
                "avg_current_attention": 73.5,
                "system_load": 0.34,
                "response_time_ms": 145,
                "eeg_data_quality": 0.96
            }
        }
        
        self.analytics_data = analytics
        return analytics
    
    def generate_all_demo_data(self) -> Dict:
        """Generate complete demo dataset"""
        
        print("🎯 Generating comprehensive demo data...")
        
        users = self.create_demo_users()
        print(f"✅ Created {len(users)} demo users")
        
        courses = self.create_demo_courses()
        print(f"✅ Created {len(courses)} demo courses")
        
        sessions = self.create_learning_sessions()
        print(f"✅ Created {len(sessions)} learning sessions")
        
        conversations = self.create_ai_conversations()
        print(f"✅ Created {len(conversations)} AI conversations")
        
        knowledge_graph = self.create_knowledge_graph_data()
        print(f"✅ Created knowledge graph with {len(knowledge_graph['nodes'])} nodes")
        
        analytics = self.create_analytics_data()
        print("✅ Created analytics data")
        
        demo_data = {
            "users": users,
            "courses": courses,
            "learning_sessions": sessions,
            "ai_conversations": conversations,
            "knowledge_graph": knowledge_graph,
            "analytics": analytics,
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0",
                "purpose": "professor_demonstration"
            }
        }
        
        return demo_data
    
    def save_demo_data(self, filename: str = "demo_data.json"):
        """Save demo data to JSON file"""
        demo_data = self.generate_all_demo_data()
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(demo_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Demo data saved to {filename}")
        return demo_data

if __name__ == "__main__":
    generator = DemoDataGenerator()
    demo_data = generator.save_demo_data("backend/demo_data.json")
    
    print("\n🎉 Demo data generation complete!")
    print("\nData Summary:")
    print(f"- Users: {len(demo_data['users'])}")
    print(f"- Courses: {len(demo_data['courses'])}")
    print(f"- Learning Sessions: {len(demo_data['learning_sessions'])}")
    print(f"- AI Conversations: {len(demo_data['ai_conversations'])}")
    print(f"- Knowledge Graph Nodes: {len(demo_data['knowledge_graph']['nodes'])}")
    print(f"- Analytics Metrics: {len(demo_data['analytics'])}")