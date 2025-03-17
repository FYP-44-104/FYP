import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FirebaseErrorRouter: React.FC = () => {
  const [errorCode, setErrorCode] = useState('');
  const [suggestion, setSuggestion] = useState<{ path: string; title: string } | null>(null);

  const errorMap: Record<string, { path: string; title: string }> = {
    'auth/admin-restricted-operation': { 
      path: '/admin-restricted-fix', 
      title: 'Fix Admin Restricted Operation Error' 
    },
    'auth/invalid-api-key': { 
      path: '/firebase-setup', 
      title: 'Firebase Setup Guide' 
    },
    'auth/network-request-failed': { 
      path: '/firebase-debug', 
      title: 'Firebase Debug Tool' 
    },
    'auth/user-not-found': { 
      path: '/auth-method-test', 
      title: 'Authentication Method Test' 
    },
    'auth/wrong-password': { 
      path: '/auth-method-test', 
      title: 'Authentication Method Test' 
    },
    'auth/email-already-in-use': { 
      path: '/auth-method-test', 
      title: 'Authentication Method Test' 
    },
    'auth/invalid-credential': { 
      path: '/auth-method-test', 
      title: 'Authentication Method Test' 
    },
    'auth/operation-not-allowed': { 
      path: '/admin-restricted-fix', 
      title: 'Fix Admin Restricted Operation Error' 
    },
    'auth/popup-closed-by-user': { 
      path: '/auth-method-test', 
      title: 'Authentication Method Test' 
    }
  };

  const handleErrorCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.trim();
    setErrorCode(code);
    
    // Check if we have a suggestion for this error code
    if (code && errorMap[code]) {
      setSuggestion(errorMap[code]);
    } else {
      setSuggestion(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Firebase Error Helper</h2>
      
      <div className="mb-6">
        <p className="text-gray-300 mb-4">
          Enter the Firebase error code you're experiencing, and we'll guide you to the right solution.
        </p>
        
        <div className="mb-4">
          <label htmlFor="errorCode" className="block text-sm font-medium text-gray-300 mb-1">
            Firebase Error Code
          </label>
          <input
            type="text"
            id="errorCode"
            value={errorCode}
            onChange={handleErrorCodeChange}
            placeholder="e.g. auth/admin-restricted-operation"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {suggestion ? (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2 text-green-400">We found a solution for you!</h3>
          <p className="text-gray-300 mb-4">
            The error <code className="bg-gray-700 px-2 py-1 rounded">{errorCode}</code> can be fixed by following our guide:
          </p>
          <Link 
            to={suggestion.path}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Go to: {suggestion.title}
          </Link>
        </div>
      ) : errorCode ? (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2 text-yellow-400">No specific guide found</h3>
          <p className="text-gray-300 mb-4">
            We don't have a specific guide for <code className="bg-gray-700 px-2 py-1 rounded">{errorCode}</code> yet.
          </p>
          <p className="text-gray-300">
            Try our general debugging tools:
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Link 
              to="/firebase-debug"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Firebase Debug Tool
            </Link>
            <Link 
              to="/auth-method-test"
              className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Authentication Method Test
            </Link>
          </div>
        </div>
      ) : null}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Common Firebase Errors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(errorMap).map(([code, { path, title }]) => (
            <div key={code} className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-1 text-white">{code}</h4>
              <Link 
                to={path}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {title} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirebaseErrorRouter; 