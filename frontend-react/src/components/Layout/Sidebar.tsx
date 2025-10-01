import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { logoutUser } from '../../store/slices/authSlice';
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  CogIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Courses', href: '/courses', icon: BookOpenIcon },
    { name: 'EEG Monitoring', href: '/eeg-monitoring', icon: CpuChipIcon },
    { name: 'AI Tutoring', href: '/ai-tutoring', icon: ChatBubbleLeftRightIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={onClose}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent navigation={navigation} user={user} onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <SidebarContent navigation={navigation} user={user} onLogout={handleLogout} />
        </div>
      </div>
    </>
  );
};

interface SidebarContentProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  user: any;
  onLogout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ navigation, user, onLogout }) => {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🧠</span>
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              NeuroLynxEdu
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI Learning Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 pb-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User info and logout */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.full_name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.full_name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role || 'Student'}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-3 w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default Sidebar;