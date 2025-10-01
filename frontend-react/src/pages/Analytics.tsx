import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchAnalytics } from '../store/slices/analyticsSlice';
import { Line, Bar } from 'react-chartjs-2';

const Analytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const focusTrendsData = {
    labels: data?.focus_trends?.map(d => d.date) || [],
    datasets: [
      {
        label: 'Attention',
        data: data?.focus_trends?.map(d => d.avg_attention) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Focus',
        data: data?.focus_trends?.map(d => d.avg_focus) || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
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
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Learning Analytics
        </h1>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Export Report
          </button>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.performance_metrics && Object.entries(data.performance_metrics).map(([key, value]) => (
          <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
              {key.replace('_', ' ')}
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
              {typeof value === 'number' ? value.toFixed(1) : value}
              {key.includes('rate') || key.includes('completion') ? '%' : ''}
              {key.includes('hours') ? 'h' : ''}
            </p>
          </div>
        ))}
      </div>

      {/* Focus Trends Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Attention & Focus Trends
        </h2>
        <div className="h-64">
          <Line data={focusTrendsData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Patterns */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Learning Patterns
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Peak Learning Hours</span>
              </div>
              <div className="flex space-x-2">
                {data?.attention_analytics?.peak_hours?.map((hour, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {hour}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Attention</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data?.attention_analytics?.avg_attention?.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${data?.attention_analytics?.avg_attention || 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Attention Stability</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data?.attention_analytics?.attention_stability}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${data?.attention_analytics?.attention_stability || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            AI Recommendations
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Optimal Study Schedule
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Your peak attention is between 9-11 AM and 2-4 PM. Schedule challenging topics during these hours.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Break Frequency
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Take a 5-minute break every 25 minutes to maintain optimal attention levels.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Learning Style
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Visual learning materials show 23% better engagement. Consider more diagrams and videos.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Difficulty Adjustment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Content difficulty automatically adjusted 12 times this week based on your attention patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;