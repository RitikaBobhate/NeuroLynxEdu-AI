"""
EEG Demo Endpoints
Simple demo endpoints for EEG functionality
"""
from fastapi import APIRouter
import random
import time
from datetime import datetime

router = APIRouter()

@router.get("/current")
async def get_current_eeg_data():
    """Get current EEG data simulation"""
    return {
        "timestamp": datetime.now().isoformat(),
        "attention": random.randint(60, 90),
        "focus": random.randint(65, 85),
        "engagement": random.randint(70, 95),
        "brainwaves": {
            "alpha": random.uniform(0.3, 0.8),
            "beta": random.uniform(0.4, 0.9),
            "gamma": random.uniform(0.1, 0.5),
            "delta": random.uniform(0.2, 0.6),
            "theta": random.uniform(0.25, 0.7)
        },
        "quality": random.randint(80, 100)
    }

@router.get("/devices")
async def get_eeg_devices():
    """Get available EEG devices"""
    return [
        {
            "id": "demo_device_1",
            "name": "NeuroLynx Demo EEG",
            "status": "connected",
            "battery": 85,
            "signal_quality": 92
        }
    ]

@router.post("/scenario/{scenario}/start")
async def start_demo_scenario(scenario: str):
    """Start a demo scenario"""
    scenarios = ["focused", "distracted", "learning", "tired"]
    if scenario not in scenarios:
        return {"error": "Invalid scenario"}

    return {
        "message": f"Started {scenario} scenario",
        "scenario": scenario,
        "duration": "5 minutes"
    }

@router.post("/scenario/stop")
async def stop_demo_scenario():
    """Stop current demo scenario"""
    return {
        "message": "Stopped demo scenario"
    }