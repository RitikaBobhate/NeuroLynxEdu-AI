import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AITutor from '../components/AITutor';

const AITutoring: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentData } = useSelector((state: RootState) => state.eeg);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Tutoring
        </h1>
        <div className="flex items-center space-x-4">
          {currentData && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current Attention: {currentData.attention.toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AITutor 
            userId={user?.username} 
            currentEEGData={currentData}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Learning Context
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Course:</span>
                <p className="font-medium text-gray-900 dark:text-white">Machine Learning 101</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Topic:</span>
                <p className="font-medium text-gray-900 dark:text-white">Neural Networks</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Learning Style:</span>
                <p className="font-medium text-gray-900 dark:text-white">Visual</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty Level:</span>
                <p className="font-medium text-gray-900 dark:text-white">Intermediate</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI Tutor Features
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">EEG-aware responses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Personalized explanations</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Adaptive difficulty</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Learning style matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Real-time attention monitoring</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Sessions
            </h2>
            <div className="space-y-3">
              {[
                { topic: 'Gradient Descent', duration: '15 min', rating: 4.8 },
                { topic: 'Neural Networks', duration: '22 min', rating: 4.6 },
                { topic: 'Linear Regression', duration: '18 min', rating: 4.9 },
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.topic}
                    </p>
                    <p className="text-sm text-gray-500">{session.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ⭐ {session.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutoring;