import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LogOut, User, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);
      await signOut(auth);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log out. Please try again.');
      console.error('Error signing out:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <span className="text-gray-400">
                Welcome, {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="w-5 h-5" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Projects</span>
                <span className="text-2xl font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Tasks</span>
                <span className="text-2xl font-bold">48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Team Members</span>
                <span className="text-2xl font-bold">8</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm">New project created</p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                <div>
                  <p className="text-sm">Task completed</p>
                  <span className="text-xs text-gray-400">4 hours ago</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                <div>
                  <p className="text-sm">New team member joined</p>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Project Review</p>
                  <span className="text-xs text-gray-400">Due tomorrow</span>
                </div>
                <button className="text-primary hover:text-primary/90 text-sm">View</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Client Meeting</p>
                  <span className="text-xs text-gray-400">Due in 2 days</span>
                </div>
                <button className="text-primary hover:text-primary/90 text-sm">View</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Documentation Update</p>
                  <span className="text-xs text-gray-400">Due in 3 days</span>
                </div>
                <button className="text-primary hover:text-primary/90 text-sm">View</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 