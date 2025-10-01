import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EEGData {
  timestamp: number;
  attention: number;
  focus: number;
  engagement: number;
  cognitive_load: number;
  brainwaves: {
    alpha: number;
    beta: number;
    theta: number;
    delta: number;
    gamma: number;
  };
}

interface EEGMonitorProps {
  userId?: string;
  isActive?: boolean;
  onDataUpdate?: (data: EEGData) => void;
}

const EEGMonitor: React.FC<EEGMonitorProps> = ({ 
  userId = 'demo_user', 
  isActive = true,
  onDataUpdate 
}) => {
  const [eegData, setEegData] = useState<EEGData[]>([]);
  const [currentData, setCurrentData] = useState<EEGData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const maxDataPoints = 50; // Show last 50 data points

  useEffect(() => {
    if (isActive) {
      connectWebSocket();
      fetchDeviceInfo();
    } else {
      disconnectWebSocket();
    }

    return () => {
      disconnectWebSocket();
    };
  }, [isActive, userId]);

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnectionStatus('connecting');
    
    const wsUrl = `ws://localhost:8000/api/v1/eeg/stream?user_id=${userId}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
      console.log('EEG WebSocket connected');
    };

    wsRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'eeg_data') {
          const newData: EEGData = {
            timestamp: message.timestamp,
            attention: message.data.attention,
            focus: message.data.focus,
            engagement: message.data.engagement,
            cognitive_load: message.data.cognitive_load,
            brainwaves: message.data.brainwaves
          };

          setCurrentData(newData);
          setEegData(prev => {
            const updated = [...prev, newData];
            return updated.slice(-maxDataPoints);
          });

          if (onDataUpdate) {
            onDataUpdate(newData);
          }
        }
      } catch (error) {
        console.error('Error parsing EEG data:', error);
      }
    };

    wsRef.current.onclose = () => {
      setConnectionStatus('disconnected');
      console.log('EEG WebSocket disconnected');
    };

    wsRef.current.onerror = (error) => {
      console.error('EEG WebSocket error:', error);
      setConnectionStatus('disconnected');
    };
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnectionStatus('disconnected');
  };

  const fetchDeviceInfo = async () => {
    try {
      const response = await fetch('/api/v1/eeg/devices');
      const data = await response.json();
      setDeviceInfo(data);
    } catch (error) {
      console.error('Error fetching device info:', error);
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      default: return 'text-red-500';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      default: return 'Disconnected';
    }
  };

  // Chart data for attention and focus
  const attentionFocusData = {
    labels: eegData.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: 'Attention',
        data: eegData.map(d => d.attention),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Focus',
        data: eegData.map(d => d.focus),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Engagement',
        data: eegData.map(d => d.engagement),
        borderColor: 'rgb(245, 101, 101)',
        backgroundColor: 'rgba(245, 101, 101, 0.1)',
        fill: false,
        tension: 0.4
      }
    ]
  };

  // Chart data for brainwaves
  const brainwaveData = {
    labels: eegData.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: 'Alpha (8-13 Hz)',
        data: eegData.map(d => d.brainwaves?.alpha || 0),
        borderColor: 'rgb(139, 69, 19)',
        backgroundColor: 'rgba(139, 69, 19, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Beta (13-30 Hz)',
        data: eegData.map(d => d.brainwaves?.beta || 0),
        borderColor: 'rgb(75, 0, 130)',
        backgroundColor: 'rgba(75, 0, 130, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Theta (4-8 Hz)',
        data: eegData.map(d => d.brainwaves?.theta || 0),
        borderColor: 'rgb(255, 165, 0)',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: false,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
      x: {
        display: false,
      }
    },
    animation: {
      duration: 0 // Disable animation for real-time updates
    }
  };

  const brainwaveOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
      },
      x: {
        display: false,
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            EEG Monitor
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time brainwave analysis
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${getConnectionStatusColor()}`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">{getConnectionStatusText()}</span>
          </div>
          {deviceInfo && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {deviceInfo.active_device || 'No device'}
            </div>
          )}
        </div>
      </div>

      {/* Current Metrics */}
      {currentData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {currentData.attention.toFixed(1)}%
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Attention</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {currentData.focus.toFixed(1)}%
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Focus</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentData.engagement.toFixed(1)}%
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">Engagement</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {currentData.cognitive_load.toFixed(1)}%
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Cognitive Load</div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attention & Focus Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Attention & Focus Levels
          </h4>
          <div className="h-64">
            <Line data={attentionFocusData} options={chartOptions} />
          </div>
        </div>

        {/* Brainwave Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Brainwave Frequencies
          </h4>
          <div className="h-64">
            <Line data={brainwaveData} options={brainwaveOptions} />
          </div>
        </div>
      </div>

      {/* Brainwave Details */}
      {currentData && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              {currentData.brainwaves.alpha.toFixed(1)} Hz
            </div>
            <div className="text-xs text-gray-500">Alpha (Relaxed)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {currentData.brainwaves.beta.toFixed(1)} Hz
            </div>
            <div className="text-xs text-gray-500">Beta (Focused)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
              {currentData.brainwaves.theta.toFixed(1)} Hz
            </div>
            <div className="text-xs text-gray-500">Theta (Creative)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {currentData.brainwaves.delta.toFixed(1)} Hz
            </div>
            <div className="text-xs text-gray-500">Delta (Deep)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-pink-600 dark:text-pink-400">
              {currentData.brainwaves.gamma.toFixed(1)} Hz
            </div>
            <div className="text-xs text-gray-500">Gamma (Insight)</div>
          </div>
        </div>
      )}

      {/* Demo Controls */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => fetch('/api/v1/eeg/demo/scenario/easy_content/start', {method: 'POST'})}
          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
        >
          Easy Content
        </button>
        <button
          onClick={() => fetch('/api/v1/eeg/demo/scenario/difficult_content/start', {method: 'POST'})}
          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200"
        >
          Difficult Content
        </button>
        <button
          onClick={() => fetch('/api/v1/eeg/demo/scenario/engaging_video/start', {method: 'POST'})}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
        >
          Engaging Video
        </button>
        <button
          onClick={() => fetch('/api/v1/eeg/demo/scenario/interactive_quiz/start', {method: 'POST'})}
          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200"
        >
          Interactive Quiz
        </button>
      </div>
    </div>
  );
};

export default EEGMonitor;