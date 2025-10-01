import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import EEGMonitor from '../components/EEGMonitor';

const EEGMonitoring: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          EEG Monitoring
        </h1>
        <div className="flex space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Start Session
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Calibrate
          </button>
        </div>
      </div>

      <EEGMonitor userId={user?.username} isActive={true} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Session History
          </h2>
          <div className="space-y-3">
            {[
              { date: '2024-01-20', duration: '45 min', avg_attention: 73 },
              { date: '2024-01-19', duration: '38 min', avg_attention: 68 },
              { date: '2024-01-18', duration: '52 min', avg_attention: 76 },
            ].map((session, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {session.date}
                  </p>
                  <p className="text-sm text-gray-500">{session.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {session.avg_attention}%
                  </p>
                  <p className="text-sm text-gray-500">Avg Attention</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Device Status
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Device:</span>
              <span className="text-gray-900 dark:text-white">OpenBCI Cyton (Simulated)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Battery:</span>
              <span className="text-gray-900 dark:text-white">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Signal Quality:</span>
              <span className="text-green-600 font-medium">Excellent</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Sampling Rate:</span>
              <span className="text-gray-900 dark:text-white">250 Hz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEGMonitoring;