import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useAnalytics } from '../hooks/useAnalytics';

const AuthTest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [success, setSuccess] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { trackUserAction } = useAnalytics();
  
  const { 
    user,
    loading,
    error,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithGithub,
    resetPassword
  } = useAuthContext();

  const clearMessages = () => {
    setSuccess('');
    setResetSent(false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    try {
      await signUp(email, password, displayName);
      setSuccess('Account created successfully!');
      trackUserAction('email_sign_up');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    try {
      await signIn(email, password);
      setSuccess('Signed in successfully!');
      trackUserAction('email_sign_in');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleGoogleSignIn = async () => {
    clearMessages();

    try {
      await signInWithGoogle();
      setSuccess('Signed in with Google successfully!');
      trackUserAction('google_sign_in');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleGithubSignIn = async () => {
    clearMessages();

    try {
      await signInWithGithub();
      setSuccess('Signed in with GitHub successfully!');
      trackUserAction('github_sign_in');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleSignOut = async () => {
    clearMessages();

    try {
      await logOut();
      setSuccess('Signed out successfully!');
      trackUserAction('sign_out');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      return;
    }
    
    clearMessages();

    try {
      await resetPassword(email);
      setResetSent(true);
      setSuccess('Password reset email sent! Check your inbox.');
      trackUserAction('password_reset_request');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Authentication Test</h2>
      
      {success && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {user ? (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-2">Currently signed in as:</h3>
          <p className="text-gray-300 mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-300 mb-1"><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
          <p className="text-gray-300 mb-1"><strong>UID:</strong> {user.uid}</p>
          <p className="text-gray-300 mb-3">
            <strong>Provider:</strong> {user.providerData[0]?.providerId || 'Unknown'}
          </p>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign Out'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                Display Name (for sign up)
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={handleEmailSignUp}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="flex justify-between">
            <button
              onClick={handlePasswordReset}
              disabled={loading || !email}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              Reset Password
            </button>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-center text-gray-400 mb-4">Or sign in with</p>
            <div className="flex space-x-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                Google
              </button>
              <button
                onClick={handleGithubSignIn}
                disabled={loading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                GitHub
              </button>
            </div>
          </div>
        </div>
      )}
      
      {resetSent && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 text-sm">
          Password reset email sent! Check your inbox.
        </div>
      )}
    </div>
  );
};

export default AuthTest; 