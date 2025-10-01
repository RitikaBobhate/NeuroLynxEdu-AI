"""
EEG Data Simulation Service for NeuroLynxEdu AI
Generates realistic brainwave patterns for demonstration purposes
"""

import asyncio
import json
import math
import random
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
import numpy as np

@dataclass
class EEGReading:
    """Single EEG data point"""
    timestamp: float
    attention: float  # 0-100
    focus: float     # 0-100
    alpha: float     # 8-13 Hz
    beta: float      # 13-30 Hz
    theta: float     # 4-8 Hz
    delta: float     # 0.5-4 Hz
    gamma: float     # 30-100 Hz
    engagement: float # Derived metric
    cognitive_load: float # Derived metric
    
@dataclass
class UserProfile:
    """EEG profile for different user types"""
    user_id: str
    baseline_attention: float
    attention_variability: float
    focus_stability: float
    learning_style: str  # visual, auditory, kinesthetic
    stress_sensitivity: float
    fatigue_rate: float

class EEGSimulator:
    """Realistic EEG data simulator"""
    
    def __init__(self):
        self.sampling_rate = 250  # Hz
        self.is_running = False
        self.current_session = None
        self.user_profiles = self._create_user_profiles()
        self.content_difficulty = 0.5  # 0-1 scale
        self.content_engagement = 0.7  # 0-1 scale
        self.session_duration = 0  # seconds
        
    def _create_user_profiles(self) -> Dict[str, UserProfile]:
        """Create diverse user profiles for demonstration"""
        return {
            "student_focused": UserProfile(
                user_id="student_focused",
                baseline_attention=75.0,
                attention_variability=15.0,
                focus_stability=0.8,
                learning_style="visual",
                stress_sensitivity=0.3,
                fatigue_rate=0.1
            ),
            "student_adhd": UserProfile(
                user_id="student_adhd",
                baseline_attention=45.0,
                attention_variability=35.0,
                focus_stability=0.3,
                learning_style="kinesthetic",
                stress_sensitivity=0.8,
                fatigue_rate=0.3
            ),
            "student_average": UserProfile(
                user_id="student_average",
                baseline_attention=60.0,
                attention_variability=20.0,
                focus_stability=0.6,
                learning_style="auditory",
                stress_sensitivity=0.5,
                fatigue_rate=0.2
            ),
            "student_gifted": UserProfile(
                user_id="student_gifted",
                baseline_attention=85.0,
                attention_variability=10.0,
                focus_stability=0.9,
                learning_style="visual",
                stress_sensitivity=0.2,
                fatigue_rate=0.05
            ),
            "demo_user": UserProfile(
                user_id="demo_user",
                baseline_attention=70.0,
                attention_variability=18.0,
                focus_stability=0.7,
                learning_style="visual",
                stress_sensitivity=0.4,
                fatigue_rate=0.15
            )
        }
    
    def set_content_context(self, difficulty: float, engagement: float, content_type: str = "text"):
        """Update content context to influence EEG patterns"""
        self.content_difficulty = max(0.0, min(1.0, difficulty))
        self.content_engagement = max(0.0, min(1.0, engagement))
        
    def _generate_base_waves(self, t: float) -> Dict[str, float]:
        """Generate base brainwave frequencies"""
        # Create realistic frequency patterns
        alpha = 10 + 2 * math.sin(2 * math.pi * 0.1 * t) + random.gauss(0, 0.5)
        beta = 20 + 5 * math.sin(2 * math.pi * 0.05 * t) + random.gauss(0, 1.0)
        theta = 6 + 1.5 * math.sin(2 * math.pi * 0.08 * t) + random.gauss(0, 0.3)
        delta = 2 + 0.8 * math.sin(2 * math.pi * 0.02 * t) + random.gauss(0, 0.2)
        gamma = 40 + 10 * math.sin(2 * math.pi * 0.15 * t) + random.gauss(0, 2.0)
        
        return {
            "alpha": max(0, alpha),
            "beta": max(0, beta),
            "theta": max(0, theta),
            "delta": max(0, delta),
            "gamma": max(0, gamma)
        }
    
    def _calculate_attention_focus(self, profile: UserProfile, waves: Dict[str, float], t: float) -> Tuple[float, float]:
        """Calculate attention and focus based on brainwaves and user profile"""
        
        # Base attention from profile
        base_attention = profile.baseline_attention
        
        # Modify based on content difficulty
        difficulty_impact = -20 * (self.content_difficulty - 0.5) if self.content_difficulty > 0.7 else 0
        
        # Modify based on content engagement
        engagement_boost = 15 * (self.content_engagement - 0.5)
        
        # Add fatigue over time
        fatigue_penalty = -profile.fatigue_rate * (self.session_duration / 60)  # per minute
        
        # Add natural variability
        variability = random.gauss(0, profile.attention_variability)
        
        # Calculate attention
        attention = base_attention + difficulty_impact + engagement_boost + fatigue_penalty + variability
        attention = max(10, min(100, attention))
        
        # Focus is related to attention but with different dynamics
        focus_base = attention * profile.focus_stability
        
        # Beta waves correlate with focus
        beta_influence = (waves["beta"] - 20) * 2
        
        # Theta waves inversely correlate with focus (daydreaming)
        theta_influence = -(waves["theta"] - 6) * 3
        
        focus = focus_base + beta_influence + theta_influence
        focus = max(10, min(100, focus))
        
        return attention, focus
    
    def _calculate_derived_metrics(self, attention: float, focus: float, waves: Dict[str, float]) -> Tuple[float, float]:
        """Calculate engagement and cognitive load"""
        
        # Engagement combines attention, focus, and alpha waves
        engagement = (attention * 0.4 + focus * 0.4 + (waves["alpha"] - 8) * 4) * 0.01 * 100
        engagement = max(0, min(100, engagement))
        
        # Cognitive load based on beta/alpha ratio and content difficulty
        beta_alpha_ratio = waves["beta"] / max(waves["alpha"], 1)
        cognitive_load = (beta_alpha_ratio * 20 + self.content_difficulty * 30) * 0.01 * 100
        cognitive_load = max(0, min(100, cognitive_load))
        
        return engagement, cognitive_load
    
    def generate_reading(self, user_id: str = "demo_user") -> EEGReading:
        """Generate a single EEG reading"""
        profile = self.user_profiles.get(user_id, self.user_profiles["demo_user"])
        
        current_time = time.time()
        t = self.session_duration
        
        # Generate base brainwaves
        waves = self._generate_base_waves(t)
        
        # Calculate attention and focus
        attention, focus = self._calculate_attention_focus(profile, waves, t)
        
        # Calculate derived metrics
        engagement, cognitive_load = self._calculate_derived_metrics(attention, focus, waves)
        
        return EEGReading(
            timestamp=current_time,
            attention=attention,
            focus=focus,
            alpha=waves["alpha"],
            beta=waves["beta"],
            theta=waves["theta"],
            delta=waves["delta"],
            gamma=waves["gamma"],
            engagement=engagement,
            cognitive_load=cognitive_load
        )
    
    async def start_session(self, user_id: str = "demo_user"):
        """Start EEG simulation session"""
        self.is_running = True
        self.session_duration = 0
        self.current_session = {
            "user_id": user_id,
            "start_time": time.time(),
            "readings": []
        }
        
    async def stop_session(self):
        """Stop EEG simulation session"""
        self.is_running = False
        
    async def get_live_data_stream(self, user_id: str = "demo_user"):
        """Generate continuous EEG data stream"""
        while self.is_running:
            reading = self.generate_reading(user_id)
            self.session_duration += 1/self.sampling_rate
            
            if self.current_session:
                self.current_session["readings"].append(asdict(reading))
            
            yield reading
            await asyncio.sleep(1/self.sampling_rate)  # 250 Hz simulation
    
    def simulate_learning_scenario(self, scenario: str, duration_minutes: int = 5) -> List[EEGReading]:
        """Generate EEG data for specific learning scenarios"""
        readings = []
        samples = int(duration_minutes * 60 * self.sampling_rate)
        
        for i in range(samples):
            t = i / self.sampling_rate
            
            # Adjust parameters based on scenario
            if scenario == "easy_content":
                self.set_content_context(difficulty=0.3, engagement=0.8)
            elif scenario == "difficult_content":
                self.set_content_context(difficulty=0.9, engagement=0.4)
            elif scenario == "engaging_video":
                self.set_content_context(difficulty=0.5, engagement=0.9)
            elif scenario == "boring_lecture":
                self.set_content_context(difficulty=0.6, engagement=0.2)
            elif scenario == "interactive_quiz":
                # Varying engagement during quiz
                engagement = 0.7 + 0.3 * math.sin(2 * math.pi * t / 30)  # 30-second cycles
                self.set_content_context(difficulty=0.7, engagement=engagement)
            
            self.session_duration = t
            reading = self.generate_reading()
            readings.append(reading)
        
        return readings
    
    def get_session_summary(self) -> Dict:
        """Get summary statistics for current session"""
        if not self.current_session or not self.current_session["readings"]:
            return {}
        
        readings = self.current_session["readings"]
        
        attention_values = [r["attention"] for r in readings]
        focus_values = [r["focus"] for r in readings]
        engagement_values = [r["engagement"] for r in readings]
        
        return {
            "session_id": self.current_session.get("session_id", "demo_session"),
            "user_id": self.current_session["user_id"],
            "duration_minutes": len(readings) / (self.sampling_rate * 60),
            "total_samples": len(readings),
            "average_attention": np.mean(attention_values),
            "average_focus": np.mean(focus_values),
            "average_engagement": np.mean(engagement_values),
            "attention_stability": 100 - np.std(attention_values),
            "peak_attention": np.max(attention_values),
            "lowest_attention": np.min(attention_values),
            "focus_episodes": self._count_focus_episodes(focus_values),
            "distraction_events": self._count_distraction_events(attention_values)
        }
    
    def _count_focus_episodes(self, focus_values: List[float], threshold: float = 70) -> int:
        """Count sustained focus episodes"""
        episodes = 0
        in_episode = False
        episode_length = 0
        
        for focus in focus_values:
            if focus >= threshold:
                if not in_episode:
                    in_episode = True
                    episode_length = 1
                else:
                    episode_length += 1
            else:
                if in_episode and episode_length >= self.sampling_rate * 10:  # 10+ seconds
                    episodes += 1
                in_episode = False
                episode_length = 0
        
        return episodes
    
    def _count_distraction_events(self, attention_values: List[float], threshold: float = 40) -> int:
        """Count attention drop events"""
        events = 0
        below_threshold = False
        
        for attention in attention_values:
            if attention < threshold and not below_threshold:
                events += 1
                below_threshold = True
            elif attention >= threshold:
                below_threshold = False
        
        return events

# Global simulator instance
eeg_simulator = EEGSimulator()