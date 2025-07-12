import React from 'react';
import { Dumbbell, Settings } from 'lucide-react';

interface AppHeaderProps {
  onLogout: () => void;
  onSettingsClick?: () => void;
  userName: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onLogout,
  onSettingsClick,
  userName,
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FitTrack</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onSettingsClick}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-600">Hello, {userName}</span>
            </div>
            <button 
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
