import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCourses } from '../store/slices/coursesSlice';
import EEGMonitor from '../components/EEGMonitor';
import AITutor from '../components/AITutor';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { courses } = useSelector((state: RootState) => state.courses);
  const { currentData } = useSelector((state: RootState) => state.eeg);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const stats = [
    {
      name: 'Study Hours Today',
      value: '3.2',
      change: '+12%',
      changeType: 'positive',
      icon: '📚',
    },
    {
      name: 'Average Attention',
      value: currentData ? `${currentData.attention.toFixed(1)}%` : '72.5%',
      change: '+5.2%',
      changeType: 'positive',
      icon: '🧠',
    },
    {
      name: 'Focus Score',
      value: currentData ? `${currentData.focus.toFixed(1)}%` : '68.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: '🎯',
    },
    {
      name: 'Learning Streak',
      value: '12 days',
      change: '+3 days',
      changeType: 'positive',
      icon: '🔥',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.full_name || 'Student'}! 👋
        </h1>
        <p className="mt-2 text-blue-100">
          Your personalized learning dashboard is ready. Let's continue your learning journey!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="mt-2">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from yesterday</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EEG Monitor */}
        <div className="lg:col-span-1">
          <EEGMonitor userId={user?.username} isActive={true} />
        </div>

        {/* AI Tutor */}
        <div className="lg:col-span-1">
          <AITutor 
            userId={user?.username} 
            currentEEGData={currentData}
          />
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {course.instructor_name}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {course.level}
                </span>
                <span className="text-sm text-gray-500">
                  ⭐ {course.rating}
                </span>
              </div>
              <button className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            {
              action: 'Completed Neural Networks module',
              time: '2 hours ago',
              score: '87%',
              icon: '✅',
            },
            {
              action: 'AI Tutor session on Gradient Descent',
              time: '4 hours ago',
              score: 'Improved understanding',
              icon: '🤖',
            },
            {
              action: 'EEG calibration completed',
              time: '1 day ago',
              score: 'Excellent signal quality',
              icon: '🧠',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{activity.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">
                {activity.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;