import React from 'react';

const FirebaseSetupGuide: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-white">Firebase Setup Guide</h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 1: Create a Firebase Project</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <p>1. Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase Console</a></p>
            <p>2. Click "Add project" or select an existing project</p>
            <p>3. Follow the setup wizard to create your project</p>
            <p>4. Enable Google Analytics if prompted (recommended)</p>
            <div className="mt-2 p-3 bg-gray-800 rounded-lg">
              <p className="text-yellow-400 text-sm">Note: Make sure you have a Google account and are logged in</p>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 2: Register Your Web App</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <p>1. In your Firebase project, click on the web icon (&lt;/&gt;) to add a web app</p>
            <p>2. Give your app a nickname (e.g., "My Web App")</p>
            <p>3. Optionally enable Firebase Hosting</p>
            <p>4. Click "Register app"</p>
            <p>5. You'll see a configuration object that looks like this:</p>
            <div className="bg-gray-800 p-3 rounded-lg overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};`}
              </pre>
            </div>
            <p>6. Keep this page open, you'll need these values for your .env file</p>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 3: Update Your .env File</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <p>1. Open the .env file in your project root</p>
            <p>2. Replace the placeholder values with your actual Firebase configuration values:</p>
            <div className="bg-gray-800 p-3 rounded-lg overflow-x-auto">
              <pre className="text-blue-400 text-sm">
{`VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID`}
              </pre>
            </div>
            <div className="mt-2 p-3 bg-gray-800 rounded-lg">
              <p className="text-yellow-400 text-sm">Important: Replace ALL placeholder values with your actual Firebase configuration values. Do not leave any as "your_api_key_here" or similar.</p>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 4: Enable Authentication Methods</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <p>1. In the Firebase Console, go to "Authentication" in the left sidebar</p>
            <p>2. Click on the "Sign-in method" tab</p>
            <p>3. Enable the authentication methods you want to use:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Email/Password</strong>: Click on it, toggle "Enable", and save
              </li>
              <li>
                <strong>Google</strong>: Click on it, toggle "Enable", select a project support email, and save
              </li>
              <li>
                <strong>GitHub</strong>: Click on it, toggle "Enable", then:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Go to <a href="https://github.com/settings/developers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Developer Settings</a></li>
                  <li>Click "New OAuth App"</li>
                  <li>Fill in the details:
                    <ul className="list-disc list-inside ml-8 mt-1">
                      <li>Application name: Your app name</li>
                      <li>Homepage URL: Your app's URL (e.g., http://localhost:5173 for development)</li>
                      <li>Authorization callback URL: <code className="bg-gray-900 px-1 rounded">https://[YOUR-PROJECT-ID].firebaseapp.com/__/auth/handler</code></li>
                    </ul>
                  </li>
                  <li>Click "Register application"</li>
                  <li>Copy the Client ID and Client Secret</li>
                  <li>Paste them in Firebase Console and save</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 5: Restart Your Development Server</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <p>1. Stop your current development server (Ctrl+C in the terminal)</p>
            <p>2. Start it again with:</p>
            <div className="bg-gray-800 p-3 rounded-lg">
              <code className="text-pink-400">npm run dev</code>
            </div>
            <p>3. Your Firebase configuration should now be working correctly</p>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 6: Test Your Configuration</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <p>1. Go to the <a href="/firebase-debug" className="text-blue-400 hover:underline">Firebase Debug</a> page</p>
            <p>2. Click "Check Firebase Configuration" to verify your setup</p>
            <p>3. If everything is working, you should see a success message</p>
            <p>4. If there are errors, follow the instructions to fix them</p>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Common Issues</h3>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3 text-gray-300">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-400">auth/invalid-api-key</h4>
                <p className="ml-4">This means your API key is incorrect or not properly set in your .env file.</p>
                <p className="ml-4">Solution: Double-check that you've copied the correct API key from Firebase Console.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-red-400">auth/operation-not-allowed</h4>
                <p className="ml-4">This means the authentication method you're trying to use is not enabled in Firebase Console.</p>
                <p className="ml-4">Solution: Go to Firebase Console &gt; Authentication &gt; Sign-in method and enable the method.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-red-400">Environment variables not loading</h4>
                <p className="ml-4">If your environment variables aren't being loaded properly:</p>
                <ul className="list-disc list-inside ml-8">
                  <li>Make sure your .env file is in the project root</li>
                  <li>Make sure you're using the correct prefix (VITE_)</li>
                  <li>Restart your development server</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FirebaseSetupGuide; 