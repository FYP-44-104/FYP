import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

const FirebaseDebug: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  const checkFirebaseConfig = () => {
    setStatus('Checking Firebase configuration...');
    setError('');

    // Collect environment variables
    const vars = {
      VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || 'Not set',
      VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'Not set',
      VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not set',
      VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'Not set',
      VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'Not set',
      VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || 'Not set',
      VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'Not set',
    };
    setEnvVars(vars);

    // Check if any environment variables are missing or using placeholder values
    const missingVars = Object.entries(vars).filter(([_, value]) => 
      value === 'Not set' || 
      value === 'your_api_key_here' || 
      value.includes('your_project_id')
    );

    if (missingVars.length > 0) {
      setError(`Missing or invalid environment variables: ${missingVars.map(([key]) => key).join(', ')}`);
      return;
    }

    // Try to initialize Firebase with the current config
    try {
      const testConfig = {
        apiKey: vars.VITE_FIREBASE_API_KEY,
        authDomain: vars.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: vars.VITE_FIREBASE_PROJECT_ID,
        storageBucket: vars.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: vars.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: vars.VITE_FIREBASE_APP_ID,
        measurementId: vars.VITE_FIREBASE_MEASUREMENT_ID
      };
      
      const testApp = initializeApp(testConfig, 'debugApp');
      const testAuth = getAuth(testApp);
      
      // Try anonymous sign-in to test auth
      signInAnonymously(testAuth)
        .then(() => {
          setStatus('Firebase configuration is valid! Authentication is working correctly.');
        })
        .catch((error) => {
          setError(`Authentication test failed: ${error.code} - ${error.message}`);
        });
    } catch (err: any) {
      setError(`Failed to initialize Firebase: ${err.message}`);
    }
  };

  const checkEnvVarsLoaded = () => {
    setStatus('');
    setError('');
    
    // Check if Vite is loading environment variables
    const testVar = import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (!testVar) {
      setError(`Environment variables don't appear to be loading. Make sure:
      1. Your .env file is in the project root directory
      2. You've restarted your development server after updating .env
      3. All variable names start with VITE_
      4. There are no syntax errors in your .env file`);
      return;
    }
    
    if (testVar === 'your_api_key_here') {
      setError(`Environment variables are loading, but you're still using placeholder values. 
      Please replace them with your actual Firebase configuration values.`);
      return;
    }
    
    setStatus('Environment variables are loading correctly!');
    
    // Show the environment variables
    const vars = {
      VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || 'Not set',
      VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'Not set',
      VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not set',
      VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'Not set',
      VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'Not set',
      VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || 'Not set',
      VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'Not set',
    };
    setEnvVars(vars);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Firebase Configuration Debug</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={checkFirebaseConfig}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Check Firebase Configuration
        </button>
        
        <button
          onClick={checkEnvVarsLoaded}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Check Environment Variables
        </button>
      </div>
      
      {status && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
          {status}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 whitespace-pre-line">
          {error}
        </div>
      )}
      
      {Object.keys(envVars).length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-white">Environment Variables</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">Variable</th>
                  <th className="py-2 px-4">Value</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(envVars).map(([key, value]) => {
                  const isPlaceholder = value === 'Not set' || 
                                       value === 'your_api_key_here' || 
                                       value.includes('your_project_id');
                  return (
                    <tr key={key} className="border-b border-gray-800">
                      <td className="py-2 px-4 font-mono text-sm">{key}</td>
                      <td className="py-2 px-4 font-mono text-sm">
                        {key.includes('API_KEY') || key.includes('APP_ID') 
                          ? (value === 'Not set' ? 'Not set' : '********') 
                          : value}
                      </td>
                      <td className="py-2 px-4">
                        {isPlaceholder ? (
                          <span className="text-red-500">Invalid</span>
                        ) : (
                          <span className="text-green-500">Valid</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-white">How to Fix</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase Console</a></li>
          <li>Select your project</li>
          <li>Click on the gear icon (⚙️) next to "Project Overview" to access Project settings</li>
          <li>Scroll down to "Your apps" section and click on your web app (or create one if you haven't)</li>
          <li>Copy the values from the firebaseConfig object</li>
          <li>Update your <code className="bg-gray-800 px-1 rounded">.env</code> file with these values</li>
          <li>Restart your development server</li>
        </ol>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">Quick Fix for auth/invalid-api-key</h3>
        <p className="text-gray-300 mb-3">
          The "auth/invalid-api-key" error occurs when you're using placeholder values instead of real Firebase credentials.
        </p>
        <p className="text-gray-300">
          Go to the <a href="/firebase-setup" className="text-blue-400 hover:underline">Firebase Setup Guide</a> for step-by-step instructions.
        </p>
      </div>
    </div>
  );
};

export default FirebaseDebug; 