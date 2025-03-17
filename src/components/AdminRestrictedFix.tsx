import React from 'react';

const AdminRestrictedFix: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-white">Fix Firebase "auth/admin-restricted-operation" Error</h2>
      
      <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-red-400">Error: auth/admin-restricted-operation</h3>
        <p className="text-gray-300">
          This error occurs when you're trying to use an authentication method that is either not enabled in your Firebase project
          or is restricted due to security settings.
        </p>
      </div>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 1: Enable Authentication Methods</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase Console</a></li>
              <li>Select your project: "collaborative-work-pl"</li>
              <li>Go to "Authentication" in the left sidebar</li>
              <li>Click on the "Sign-in method" tab</li>
              <li>For each authentication method you want to use:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li>Click on the method (Email/Password, Google, GitHub, etc.)</li>
                  <li>Toggle the "Enable" switch to ON</li>
                  <li>Configure any additional settings required</li>
                  <li>Click "Save"</li>
                </ul>
              </li>
            </ol>
            
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
              <strong>Note:</strong> Make sure to enable <strong>all</strong> authentication methods that your app uses.
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 2: Configure OAuth Providers (for Google/GitHub)</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="text-lg font-medium mb-3 text-white">Google Authentication</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>In Firebase Console {'>'}  Authentication {'>'}  Sign-in method, click on Google</li>
              <li>Make sure it's enabled</li>
              <li>Add your app's domain to the "Authorized domains" list (for development, add "localhost")</li>
              <li>Configure the OAuth consent screen in Google Cloud Console (link provided in Firebase)</li>
              <li>Save your changes</li>
            </ol>
            
            <h4 className="text-lg font-medium mt-6 mb-3 text-white">GitHub Authentication</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Create a GitHub OAuth App at <a href="https://github.com/settings/developers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Developer Settings</a></li>
              <li>Set the Authorization callback URL to: <code className="bg-gray-800 px-1 rounded">https://collaborative-work-pl.firebaseapp.com/__/auth/handler</code></li>
              <li>Copy the Client ID and Client Secret</li>
              <li>In Firebase Console {'>'}  Authentication {'>'}  Sign-in method, click on GitHub</li>
              <li>Enter the Client ID and Client Secret</li>
              <li>Save your changes</li>
            </ol>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 3: Configure Email/Password Authentication</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>In Firebase Console {'>'}  Authentication {'>'}  Sign-in method, click on Email/Password</li>
              <li>Enable the "Email/Password" option</li>
              <li>Decide whether to enable "Email link (passwordless sign-in)" as well</li>
              <li>Save your changes</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm">
              <strong>Tip:</strong> For testing, you might want to create a test user in the "Users" tab of the Authentication section.
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 4: Check Authorized Domains</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>In Firebase Console {'>'}  Authentication, click on the "Settings" tab</li>
              <li>Scroll down to "Authorized domains"</li>
              <li>Make sure "localhost" is in the list (for development)</li>
              <li>Add any other domains where your app will be hosted</li>
            </ol>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Step 5: Test Each Authentication Method</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-4">
              Use our <a href="/auth-method-test" className="text-blue-400 hover:underline">Authentication Method Test</a> tool to check each method individually.
            </p>
            <p className="text-gray-300">
              This will help you identify exactly which authentication method is causing the error.
            </p>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Common Issues and Solutions</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2 text-white">Issue: Anonymous Authentication Not Working</h4>
              <p className="text-gray-300">
                Make sure Anonymous Authentication is enabled in Firebase Console {'>'}  Authentication {'>'}  Sign-in method.
              </p>
            </div>
            
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2 text-white">Issue: Email/Password Authentication Not Working</h4>
              <p className="text-gray-300">
                Ensure Email/Password Authentication is enabled and check if you need to create test users in the Firebase Console.
              </p>
            </div>
            
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2 text-white">Issue: Google Authentication Not Working</h4>
              <p className="text-gray-300">
                Verify that your Google OAuth configuration is correct and that you've set up the OAuth consent screen properly.
              </p>
            </div>
            
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2 text-white">Issue: GitHub Authentication Not Working</h4>
              <p className="text-gray-300">
                Double-check your GitHub OAuth App settings, especially the callback URL, and make sure the Client ID and Secret are entered correctly in Firebase.
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-green-400">Need More Help?</h3>
        <p className="text-gray-300">
          If you're still experiencing issues after following these steps, check the <a href="https://firebase.google.com/docs/auth/web/start" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase Authentication documentation</a> or use the <a href="/firebase-debug" className="text-blue-400 hover:underline">Firebase Debug Tool</a> for more detailed diagnostics.
        </p>
      </div>
    </div>
  );
};

export default AdminRestrictedFix; 