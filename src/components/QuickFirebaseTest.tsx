import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

const QuickFirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testFirebaseConfig = async () => {
    setLoading(true);
    setStatus('');
    setError('');

    try {
      // Get environment variables
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      
      // Check if essential variables are set
      if (!apiKey || apiKey === 'your_api_key_here') {
        setError('API Key is missing or using a placeholder value. Please update your .env file.');
        setLoading(false);
        return;
      }
      
      if (!authDomain || authDomain.includes('your_project_id')) {
        setError('Auth Domain is missing or using a placeholder value. Please update your .env file.');
        setLoading(false);
        return;
      }
      
      if (!projectId || projectId === 'your_project_id') {
        setError('Project ID is missing or using a placeholder value. Please update your .env file.');
        setLoading(false);
        return;
      }

      // Create a test config
      const testConfig = {
        apiKey,
        authDomain,
        projectId,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
      };
      
      // Initialize Firebase with the test config
      const testApp = initializeApp(testConfig, 'quickTest');
      const testAuth = getAuth(testApp);
      
      // Try anonymous sign-in to test auth
      await signInAnonymously(testAuth);
      setStatus('Success! Your Firebase configuration is working correctly.');
    } catch (err: any) {
      if (err.code === 'auth/invalid-api-key') {
        setError(`Error: Invalid API Key. Please check that you've copied the correct API key from Firebase Console.`);
      } else {
        setError(`Error: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="text-lg font-semibold mb-3 text-white">Quick Firebase Test</h3>
      
      <button
        onClick={testFirebaseConfig}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Firebase Configuration'}
      </button>
      
      {status && (
        <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
          {status}
        </div>
      )}
      
      {error && (
        <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-400">
        <p>Having issues? Go to the <a href="/firebase-debug" className="text-blue-400 hover:underline">Firebase Debug</a> page for detailed diagnostics.</p>
      </div>
    </div>
  );
};

export default QuickFirebaseTest; 