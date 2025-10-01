import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const demoAccounts = [
    { username: 'alice_chen', role: 'Student (Focused Learner)' },
    { username: 'marcus_johnson', role: 'Student (ADHD Profile)' },
    { username: 'prof_martinez', role: 'Educator' },
    { username: 'admin_system', role: 'Administrator' },
    { username: 'demo', role: 'Demo User' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🧠</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            NeuroLynxEdu AI
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            AI-Powered Personalized Learning Platform
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.username}
                  onClick={() => {
                    setUsername(account.username);
                    setPassword('demo123');
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <div className="font-medium">{account.username}</div>
                  <div className="text-xs text-white/60">{account.role}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 text-center text-xs text-white/60">
              Password for all demo accounts: <span className="font-mono">demo123</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-white/60">
          <p>🧠 EEG-Powered Adaptive Learning</p>
          <p>🤖 AI Tutoring System</p>
          <p>📊 Real-time Analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Login;