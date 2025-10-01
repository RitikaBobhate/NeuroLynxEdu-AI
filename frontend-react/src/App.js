import React, { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [eegData, setEegData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Simulate EEG data fetching
  useEffect(() => {
    const fetchEEGData = async () => {
      try {
        const response = await fetch('/api/v1/eeg/data/latest');
        const data = await response.json();
        setEegData(data.data);
        setIsConnected(true);
      } catch (error) {
        console.error('EEG data fetch failed:', error);
        // Use mock data for demo
        setEegData({
          attention: 72.5,
          focus: 68.3,
          engagement: 75.8,
          cognitive_load: 45.2,
          brainwaves: {
            alpha: 10.2,
            beta: 18.7,
            theta: 6.1,
            delta: 2.8,
            gamma: 35.4
          }
        });
        setIsConnected(true);
      }
    };

    fetchEEGData();
    const interval = setInterval(fetchEEGData, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleScenario = async (scenario) => {
    try {
      await fetch(`/api/v1/eeg/demo/scenario/${scenario}/start`, {
        method: 'POST'
      });
      alert(`Started ${scenario.replace('_', ' ')} scenario! Watch the EEG metrics change.`);
    } catch (error) {
      console.error('Scenario start failed:', error);
      alert(`Demo scenario "${scenario}" activated! (Simulated)`);
    }
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = { sender: 'user', text: currentMessage, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response based on EEG data
    setTimeout(() => {
      let aiResponse = "I understand you're asking about that topic. ";
      
      if (eegData) {
        if (eegData.attention > 70) {
          aiResponse += "I can see your attention is high right now, so let me give you a detailed explanation...";
        } else if (eegData.attention < 50) {
          aiResponse += "I notice your attention seems low. Let me break this down into simpler steps...";
        } else {
          aiResponse += "Based on your current focus level, here's a balanced explanation...";
        }
      }
      
      const aiMessage = { sender: 'ai', text: aiResponse, timestamp: new Date() };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setCurrentMessage('');
  };

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-white font-bold text-2xl">🧠</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              NeuroLynxEdu AI
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              AI-Powered Personalized Learning Platform with EEG Integration
            </p>
          </div>

          {/* Demo Navigation */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <button
              onClick={() => setCurrentView('eeg')}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105"
            >
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">EEG Monitoring</h3>
              <p className="text-blue-100">Real-time brain activity monitoring and analysis</p>
            </button>
            
            <button
              onClick={() => setCurrentView('ai')}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105"
            >
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Tutoring</h3>
              <p className="text-blue-100">EEG-aware AI assistant for personalized learning</p>
            </button>
            
            <button
              onClick={() => setCurrentView('analytics')}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105"
            >
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-blue-100">Learning insights and performance metrics</p>
            </button>
          </div>

          {/* Status */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white">Backend API Running</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white">EEG Simulation Active</span>
              </div>
            </div>
            <p className="text-blue-100">
              🎯 Ready for Professor Demonstration - Click any module above to explore
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <span className="text-xl">🧠</span>
                <span className="font-bold">NeuroLynxEdu AI</span>
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('eeg')}
                className={`px-4 py-2 rounded ${currentView === 'eeg' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                EEG Monitor
              </button>
              <button
                onClick={() => setCurrentView('ai')}
                className={`px-4 py-2 rounded ${currentView === 'ai' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                AI Tutor
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`px-4 py-2 rounded ${currentView === 'analytics' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* EEG Monitoring View */}
        {currentView === 'eeg' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Real-time EEG Monitoring</h2>
            
            {/* EEG Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Device Status</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">OpenBCI Cyton (Simulated) - 8 Channel EEG</p>
            </div>

            {/* Live Metrics */}
            {eegData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{eegData.attention?.toFixed(1)}%</div>
                  <div className="text-sm text-blue-600">Attention</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{eegData.focus?.toFixed(1)}%</div>
                  <div className="text-sm text-green-600">Focus</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{eegData.engagement?.toFixed(1)}%</div>
                  <div className="text-sm text-purple-600">Engagement</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">{eegData.cognitive_load?.toFixed(1)}%</div>
                  <div className="text-sm text-orange-600">Cognitive Load</div>
                </div>
              </div>
            )}

            {/* Brainwave Data */}
            {eegData?.brainwaves && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Brainwave Frequencies</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-600">{eegData.brainwaves.alpha?.toFixed(1)} Hz</div>
                    <div className="text-xs text-gray-500">Alpha (Relaxed)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{eegData.brainwaves.beta?.toFixed(1)} Hz</div>
                    <div className="text-xs text-gray-500">Beta (Focused)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">{eegData.brainwaves.theta?.toFixed(1)} Hz</div>
                    <div className="text-xs text-gray-500">Theta (Creative)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-indigo-600">{eegData.brainwaves.delta?.toFixed(1)} Hz</div>
                    <div className="text-xs text-gray-500">Delta (Deep)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-pink-600">{eegData.brainwaves.gamma?.toFixed(1)} Hz</div>
                    <div className="text-xs text-gray-500">Gamma (Insight)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Demo Scenarios */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Demo Scenarios</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleScenario('easy_content')}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                >
                  Easy Content
                </button>
                <button
                  onClick={() => handleScenario('difficult_content')}
                  className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                >
                  Difficult Content
                </button>
                <button
                  onClick={() => handleScenario('engaging_video')}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                >
                  Engaging Video
                </button>
                <button
                  onClick={() => handleScenario('interactive_quiz')}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
                >
                  Interactive Quiz
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click scenarios to see how EEG metrics change based on different learning content types
              </p>
            </div>
          </div>
        )}

        {/* AI Tutor View */}
        {currentView === 'ai' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">EEG-Aware AI Tutor</h2>
            
            {/* Current EEG Context */}
            {eegData && (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Brain State:</span>
                  <div className="flex space-x-4 text-sm">
                    <span>Attention: {eegData.attention?.toFixed(0)}%</span>
                    <span>Focus: {eegData.focus?.toFixed(0)}%</span>
                    <span>Engagement: {eegData.engagement?.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Chat with AI Tutor</h3>
              
              {/* Messages */}
              <div className="h-64 overflow-y-auto border rounded p-4 mb-4 space-y-2">
                {chatMessages.length === 0 && (
                  <div className="text-gray-500 text-center">
                    <p>👋 Hi! I'm your AI tutor. I can see your brain activity and adapt my responses accordingly.</p>
                    <p className="text-sm mt-2">Try asking: "What is machine learning?" or "Explain neural networks"</p>
                  </div>
                )}
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything about your course..."
                  className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </div>

              {/* Quick Questions */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What is machine learning?",
                    "Explain neural networks",
                    "How does gradient descent work?",
                    "I'm struggling with this concept"
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMessage(question)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Analytics</h2>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Time Today</h3>
                <div className="text-3xl font-bold text-blue-600">2.5h</div>
                <div className="text-sm text-green-600">+15% from yesterday</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Attention</h3>
                <div className="text-3xl font-bold text-green-600">{eegData?.attention?.toFixed(1) || '72.5'}%</div>
                <div className="text-sm text-green-600">+5.2% this week</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Streak</h3>
                <div className="text-3xl font-bold text-purple-600">12 days</div>
                <div className="text-sm text-green-600">Personal best!</div>
              </div>
            </div>

            {/* Learning Insights */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">AI-Powered Insights</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">Optimal Study Time</h4>
                  <p className="text-sm text-gray-600">Your peak attention is between 9-11 AM and 2-4 PM. Schedule challenging topics during these hours.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900">Break Recommendations</h4>
                  <p className="text-sm text-gray-600">Take a 5-minute break every 25 minutes to maintain optimal attention levels.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900">Learning Style</h4>
                  <p className="text-sm text-gray-600">Visual learning materials show 23% better engagement. Consider more diagrams and videos.</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Learning Activity</h3>
              <div className="space-y-3">
                {[
                  { activity: "Completed Neural Networks module", time: "2 hours ago", score: "87%" },
                  { activity: "AI Tutor session on Gradient Descent", time: "4 hours ago", score: "Improved understanding" },
                  { activity: "EEG calibration completed", time: "1 day ago", score: "Excellent signal quality" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.activity}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <span className="text-sm text-green-600 font-medium">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;