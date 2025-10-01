"""
EEG data processing and real-time monitoring endpoints
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Dict
import asyncio
import json
import random
from datetime import datetime

router = APIRouter()

class EEGDevice(BaseModel):
    id: str
    name: str
    status: str  # connected, disconnected, error
    battery_level: int
    signal_quality: str  # excellent, good, fair, poor
    sampling_rate: int

class EEGData(BaseModel):
    timestamp: datetime
    raw_data: List[float]
    processed_data: Dict[str, float]
    focus_level: float
    attention_level: float
    meditation_level: float
    signal_quality: float

# Store active WebSocket connections
active_connections: List[WebSocket] = []

@router.get("/devices", response_model=List[EEGDevice])
async def get_eeg_devices():
    """Get available EEG devices"""
    return [
        EEGDevice(
            id="openbci_001",
            name="OpenBCI Cyton",
            status="connected",
            battery_level=85,
            signal_quality="good",
            sampling_rate=250
        )
    ]

@router.post("/devices/{device_id}/connect")
async def connect_device(device_id: str):
    """Connect to EEG device"""
    return {"message": f"Connected to device {device_id}", "status": "connected"}

@router.post("/devices/{device_id}/disconnect")
async def disconnect_device(device_id: str):
    """Disconnect EEG device"""
    return {"message": f"Disconnected from device {device_id}", "status": "disconnected"}

@router.post("/devices/{device_id}/calibrate")
async def calibrate_device(device_id: str):
    """Calibrate EEG device"""
    return {"message": "Calibration started", "estimated_time": 60}

@router.get("/data/latest")
async def get_latest_eeg_data():
    """Get latest EEG data point"""
    return EEGData(
        timestamp=datetime.now(),
        raw_data=[random.uniform(-100, 100) for _ in range(8)],  # 8 channels
        processed_data={
            "alpha": random.uniform(0.3, 0.8),
            "beta": random.uniform(0.2, 0.7),
            "theta": random.uniform(0.1, 0.5),
            "delta": random.uniform(0.1, 0.4)
        },
        focus_level=random.uniform(0.6, 0.95),
        attention_level=random.uniform(0.5, 0.9),
        meditation_level=random.uniform(0.3, 0.8),
        signal_quality=random.uniform(0.7, 1.0)
    )

@router.websocket("/stream")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time EEG data streaming"""
    await websocket.accept()
    active_connections.append(websocket)
    
    try:
        while True:
            # Generate mock EEG data
            eeg_data = {
                "timestamp": datetime.now().isoformat(),
                "focus_level": random.uniform(0.6, 0.95),
                "attention_level": random.uniform(0.5, 0.9),
                "meditation_level": random.uniform(0.3, 0.8),
                "signal_quality": random.uniform(0.7, 1.0),
                "raw_channels": [random.uniform(-100, 100) for _ in range(8)]
            }
            
            await websocket.send_text(json.dumps(eeg_data))
            await asyncio.sleep(0.25)  # 4Hz update rate
            
    except WebSocketDisconnect:
        active_connections.remove(websocket)

@router.get("/analysis/focus-patterns")
async def get_focus_patterns():
    """Analyze focus patterns from EEG data"""
    return {
        "peak_focus_times": ["09:30", "14:00", "16:30"],
        "average_session_focus": 0.78,
        "focus_decline_rate": 0.02,  # per minute
        "optimal_break_intervals": 25,  # minutes
        "attention_span_trend": "improving"
    }

@router.get("/analysis/learning-state")
async def get_learning_state():
    """Get current cognitive learning state"""
    return {
        "current_state": "focused",
        "readiness_score": 0.87,
        "cognitive_load": 0.65,
        "stress_level": 0.23,
        "recommended_action": "continue_learning",
        "optimal_difficulty": "medium-high"
    }