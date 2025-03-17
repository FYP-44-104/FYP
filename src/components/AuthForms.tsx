import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Mail, Slack } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAnalytics } from '../hooks/useAnalytics';

interface AuthFormsProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

const AuthForms: React.FC<AuthFormsProps> = ({ 
  isOpen, 
  onClose, 
  redirectPath = '/' 
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { trackUserAction } = useAnalytics();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from location state, if available
  const from = location.state?.from?.pathname || redirectPath;
  
  const { 
    loading, 
    error, 
    signIn, 
    signUp, 
    signInWithGoogle, 
    signInWithGithub, 
    resetPassword,
    clearError
  } = useAuthContext();

  // Clear form state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setResetSent(false);
      clearError();
    }
  }, [isOpen, clearError]);

  const handleSuccessfulAuth = () => {
    onClose();
    // Navigate to the intended destination or default redirect path
    navigate(from);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await signUp(email, password, name);
        trackUserAction('email_sign_up');
      } else {
        await signIn(email, password);
        trackUserAction('email_sign_in');
      }
      handleSuccessfulAuth();
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      trackUserAction('google_sign_in');
      handleSuccessfulAuth();
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      trackUserAction('github_sign_in');
      handleSuccessfulAuth();
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      return;
    }
    
    try {
      await resetPassword(email);
      setResetSent(true);
      trackUserAction('password_reset_request');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative border border-gray-800 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {resetSent && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
                Password reset email sent! Check your inbox.
              </div>
            )}

            <div className="space-y-4 mb-8">
              <button 
                onClick={handleGithubLogin}
                disabled={loading}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="w-5 h-5 text-red-500" />
                Continue with Google
              </button>
              <button 
                disabled={loading}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Slack className="w-5 h-5 text-blue-500" />
                Continue with Slack
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  disabled={loading}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePasswordReset}
                disabled={loading || !email}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
              >
                Reset Password
              </button>
            </div>

            <p className="mt-6 text-center text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:text-primary/90 font-medium transition-colors"
                disabled={loading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthForms;