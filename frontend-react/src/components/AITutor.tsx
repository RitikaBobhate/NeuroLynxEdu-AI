import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, UserIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  eegContext?: {
    attention: number;
    focus: number;
    engagement: number;
  };
  confidence?: number;
  personalizationFactors?: string[];
}

interface AITutorProps {
  userId?: string;
  courseId?: string;
  currentEEGData?: any;
  onMessageSent?: (message: string) => void;
}

const AITutor: React.FC<AITutorProps> = ({ 
  userId = 'demo_user', 
  courseId = 'cs_ml_101',
  currentEEGData,
  onMessageSent 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Demo conversation starters
  const conversationStarters = [
    "I don't understand gradient descent. Can you explain it?",
    "What's the difference between supervised and unsupervised learning?",
    "How do neural networks actually learn?",
    "I'm struggling with this concept. Can you help?",
    "Can you give me a practical example of machine learning?"
  ];

  // AI responses based on EEG context and learning patterns
  const getAIResponse = (userMessage: string, eegData?: any): Message => {
    const responses = {
      gradient_descent: {
        high_attention: "Great! I can see you're really focused right now. Gradient descent is like finding the bottom of a valley while blindfolded. You feel the slope around you and take steps in the steepest downward direction. In ML, the 'valley' is your error function, and you're trying to minimize prediction errors. Since your attention is high, let me show you the mathematical intuition...",
        low_attention: "I notice your attention seems a bit scattered right now - let's use a simple analogy! Think of gradient descent like rolling a ball down a hill. The ball naturally finds the lowest point. In machine learning, we're trying to find the 'lowest error' point for our model. Would you like me to break this down into smaller steps?",
        default: "Gradient descent is an optimization algorithm used to minimize the cost function in machine learning. Think of it as finding the lowest point in a landscape by always moving in the direction of steepest descent."
      },
      supervised_unsupervised: {
        high_attention: "Perfect timing for this question - your focus is excellent! Supervised learning is like learning with a teacher who gives you the right answers (labeled data). Unsupervised learning is like being a detective, finding hidden patterns without knowing what you're looking for. Since you're so focused, let me dive into the technical details...",
        low_attention: "Let me give you a quick, clear distinction! Supervised = learning with examples and correct answers (like flashcards). Unsupervised = finding patterns on your own (like sorting your music by discovering genres). Which type would you like to explore first?",
        default: "Supervised learning uses labeled training data to learn input-output mappings, while unsupervised learning finds hidden patterns in data without labels."
      },
      neural_networks: {
        high_attention: "Excellent question! I can see your brain is in prime learning mode. Neural networks learn through a process called backpropagation - they make predictions, compare them to correct answers, then adjust their internal weights to improve. It's like a student taking practice tests and learning from mistakes, but happening millions of times. Want to see the mathematical details?",
        low_attention: "Neural networks are like a brain made of simple math units! Each 'neuron' receives inputs, does a calculation, and passes the result forward. When the network makes mistakes, it adjusts to do better next time. Think of it like learning to ride a bike - lots of small adjustments until you get it right!",
        default: "Neural networks learn by adjusting weights between neurons based on prediction errors, using algorithms like backpropagation to minimize loss functions."
      },
      help_struggling: {
        high_attention: "I can see you're really trying to focus on this - that's great! Your EEG shows good attention levels. Let's break down whatever you're struggling with into smaller, manageable pieces. What specific concept is giving you trouble?",
        low_attention: "I notice your attention might be a bit low right now. That's totally normal! Sometimes our brains need a different approach. Would you prefer a visual explanation, a hands-on example, or should we take a quick break and come back to this?",
        default: "I'm here to help! What specific concept or problem are you working on? Let's tackle it step by step."
      },
      practical_example: {
        high_attention: "Great question! Since your focus is sharp, let me give you a comprehensive real-world example. Netflix's recommendation system uses collaborative filtering - it analyzes what movies you and similar users liked to suggest new content. The algorithm looks at viewing patterns, ratings, and even when you pause or rewind. This involves matrix factorization, deep learning for content analysis, and reinforcement learning for optimizing engagement...",
        low_attention: "Perfect! Let's use something you know - Netflix recommendations! When Netflix suggests movies, it's using machine learning. It looks at what you watched, what similar people watched, and finds patterns. Simple but powerful! Want to see how this works step by step?",
        default: "A great example is email spam detection - algorithms learn from thousands of emails labeled as 'spam' or 'not spam' to automatically filter your inbox."
      }
    };

    // Determine response category based on message content
    let category = 'default';
    let responseSet = responses.supervised_unsupervised; // default

    if (userMessage.toLowerCase().includes('gradient descent')) {
      responseSet = responses.gradient_descent;
    } else if (userMessage.toLowerCase().includes('supervised') || userMessage.toLowerCase().includes('unsupervised')) {
      responseSet = responses.supervised_unsupervised;
    } else if (userMessage.toLowerCase().includes('neural network')) {
      responseSet = responses.neural_networks;
    } else if (userMessage.toLowerCase().includes('struggling') || userMessage.toLowerCase().includes('help')) {
      responseSet = responses.help_struggling;
    } else if (userMessage.toLowerCase().includes('example') || userMessage.toLowerCase().includes('practical')) {
      responseSet = responses.practical_example;
    }

    // Determine attention level and select appropriate response
    let responseText = responseSet.default;
    let personalizationFactors = ['general_response'];
    
    if (eegData) {
      if (eegData.attention > 70 && eegData.focus > 65) {
        responseText = responseSet.high_attention || responseSet.default;
        personalizationFactors = ['high_attention', 'detailed_explanation'];
      } else if (eegData.attention < 50 || eegData.focus < 45) {
        responseText = responseSet.low_attention || responseSet.default;
        personalizationFactors = ['low_attention', 'simplified_explanation', 'interactive_approach'];
      }
    }

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      content: responseText,
      timestamp: new Date(),
      eegContext: eegData ? {
        attention: eegData.attention,
        focus: eegData.focus,
        engagement: eegData.engagement
      } : undefined,
      confidence: 0.85 + Math.random() * 0.1, // Simulate confidence score
      personalizationFactors
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setIsLoading(true);

    if (onMessageSent) {
      onMessageSent(inputMessage);
    }

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage, currentEEGData);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startConversation = (starter: string) => {
    setInputMessage(starter);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      sender: 'ai',
      content: `Hi! I'm your AI tutor, and I can see your current brain activity to personalize my explanations. ${currentEEGData ? `Your attention level is ${currentEEGData.attention?.toFixed(1)}% - perfect for learning!` : 'Ask me anything about your course material!'} What would you like to explore today?`,
      timestamp: new Date(),
      confidence: 0.95,
      personalizationFactors: ['welcome_message', 'eeg_aware']
    };
    
    setMessages([welcomeMessage]);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-96">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CpuChipIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Tutor
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              EEG-Aware Learning Assistant
            </p>
          </div>
        </div>
        {currentEEGData && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Attention: {currentEEGData.attention?.toFixed(1)}%
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <CpuChipIcon className="w-4 h-4 mt-1 text-blue-500" />
                )}
                {message.sender === 'user' && (
                  <UserIcon className="w-4 h-4 mt-1 text-white" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  
                  {/* EEG Context Display */}
                  {message.eegContext && (
                    <div className="mt-2 text-xs opacity-75">
                      <div className="flex space-x-2">
                        <span>📊 A:{message.eegContext.attention.toFixed(0)}%</span>
                        <span>🎯 F:{message.eegContext.focus.toFixed(0)}%</span>
                        <span>💡 E:{message.eegContext.engagement.toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Personalization Factors */}
                  {message.personalizationFactors && message.sender === 'ai' && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.personalizationFactors.map((factor, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {factor.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Confidence Score */}
                  {message.confidence && (
                    <div className="mt-1 text-xs opacity-60">
                      Confidence: {(message.confidence * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <CpuChipIcon className="w-4 h-4 text-blue-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Conversation Starters */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {conversationStarters.slice(0, 3).map((starter, index) => (
              <button
                key={index}
                onClick={() => startConversation(starter)}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {starter.length > 30 ? starter.substring(0, 30) + '...' : starter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your course..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;