import React, { useState } from 'react';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthMethodTest: React.FC = () => {
  const [results, setResults] = useState<Record<string, { success: boolean; message: string }>>({});
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const testMethod = async (name: string, testFn: () => Promise<any>) => {
    try {
      setResults(prev => ({ 
        ...prev, 
        [name]: { success: false, message: 'Testing...' } 
      }));
      
      await testFn();
      
      setResults(prev => ({ 
        ...prev, 
        [name]: { success: true, message: 'Success!' } 
      }));
    } catch (error: any) {
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          success: false, 
          message: `Error: ${error.code} - ${error.message}` 
        } 
      }));
    }
  };

  const testAnonymous = () => {
    return testMethod('anonymous', () => signInAnonymously(auth));
  };

  const testEmailPassword = () => {
    return testMethod('emailPassword', () => 
      signInWithEmailAndPassword(auth, email, password)
        .catch(() => createUserWithEmailAndPassword(auth, email, password))
    );
  };

  const testGoogle = () => {
    const provider = new GoogleAuthProvider();
    return testMethod('google', () => signInWithPopup(auth, provider));
  };

  const testGithub = () => {
    const provider = new GithubAuthProvider();
    return testMethod('github', () => signInWithPopup(auth, provider));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Authentication Method Test</h2>
      
      <div className="mb-6">
        <p className="text-gray-300 mb-4">
          This tool tests each authentication method individually to identify which one is causing the error.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Test Email (for Email/Password)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Test Password (for Email/Password)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={testAnonymous}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Test Anonymous Auth
        </button>
        
        <button
          onClick={testEmailPassword}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Test Email/Password Auth
        </button>
        
        <button
          onClick={testGoogle}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Test Google Auth
        </button>
        
        <button
          onClick={testGithub}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Test GitHub Auth
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3 text-white">Test Results</h3>
        
        {Object.keys(results).length === 0 ? (
          <p className="text-gray-400">No tests run yet. Click the buttons above to test each method.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(results).map(([method, result]) => (
              <div 
                key={method}
                className={`p-4 rounded-lg ${
                  result.success 
                    ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-500'
                }`}
              >
                <h4 className="font-medium mb-1 capitalize">{method} Authentication</h4>
                <p className="text-sm">{result.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-white">How to Fix admin-restricted-operation</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase Console</a></li>
          <li>Select your project: "collaborative-work-pl"</li>
          <li>Go to "Authentication" in the left sidebar</li>
          <li>Click on the "Sign-in method" tab</li>
          <li>Enable each authentication method you want to use</li>
          <li>For Google/GitHub auth, make sure your OAuth configuration is correct</li>
          <li>For Email/Password, ensure it's enabled and properly configured</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthMethodTest; 