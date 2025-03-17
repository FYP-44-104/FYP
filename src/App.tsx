import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import ProductShowcase from './components/ProductShowcase';
import TechnicalFeatures from './components/TechnicalFeatures';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import './styles/animations.css';
import Home from './components/Home';
import AuthTest from './components/AuthTest';
import FirebaseDebug from './components/FirebaseDebug';
import FirebaseSetupGuide from './components/FirebaseSetupGuide';
import QuickFirebaseTest from './components/QuickFirebaseTest';
import AuthMethodTest from './components/AuthMethodTest';
import AdminRestrictedFix from './components/AdminRestrictedFix';
import FirebaseErrorRouter from './components/FirebaseErrorRouter';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './config/firebase';
import { useAnalytics } from './hooks/useAnalytics';
import { AuthProvider } from './context/AuthContext';
import { useAuthContext } from './context/AuthContext';

// Create a LandingPage component to organize the landing page sections
const LandingPage = () => {
  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  }, []);

  return (
    <>
      <Hero />
      <div id="features">
        <Hero />
      </div>
      <div id="solutions">
        <Benefits />
      </div>
      <div id="resources">
        <ProductShowcase />
      </div>
      <TechnicalFeatures />
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
};

// Dashboard component that will be shown to authenticated users
const Dashboard = () => {
  const { user } = useAuthContext();
  
  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome, {user?.displayName || user?.email || 'User'}!</h1>
        
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Account</h2>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">User ID:</span> {user?.uid}</p>
            <p><span className="font-medium">Email Verified:</span> {user?.emailVerified ? 'Yes' : 'No'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">Home Page</a></li>
              <li><a href="/#features" className="text-blue-400 hover:text-blue-300 transition-colors">Features</a></li>
              <li><a href="/#pricing" className="text-blue-400 hover:text-blue-300 transition-colors">Pricing</a></li>
              <li><a href="/auth-test" className="text-blue-400 hover:text-blue-300 transition-colors">Auth Test</a></li>
            </ul>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Support</h2>
            <ul className="space-y-2">
              <li><a href="/firebase-debug" className="text-blue-400 hover:text-blue-300 transition-colors">Firebase Debug</a></li>
              <li><a href="/firebase-error-helper" className="text-blue-400 hover:text-blue-300 transition-colors">Error Helper</a></li>
              <li><a href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppRoutes() {
  const { user, loading } = useAuthContext();
  const { trackPageView } = useAnalytics();
  const [showQuickTest, setShowQuickTest] = useState(false);

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);

    // Check if we should show the quick test
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (apiKey === 'your_api_key_here' || !apiKey) {
      setShowQuickTest(false); // Don't show if using placeholder values
    } else {
      setShowQuickTest(true); // Show if real values are being used
    }
  }, [trackPageView]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Routes>
        {/* Public routes - accessible to all users */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/firebase-debug" element={<FirebaseDebug />} />
        <Route path="/firebase-setup" element={<FirebaseSetupGuide />} />
        <Route path="/auth-method-test" element={<AuthMethodTest />} />
        <Route path="/admin-restricted-fix" element={<AdminRestrictedFix />} />
        <Route path="/firebase-error-helper" element={<FirebaseErrorRouter />} />
        
        {/* Auth test route - accessible to all but shows different content based on auth state */}
        <Route path="/auth-test" element={<AuthTest />} />
        
        {/* Protected routes - only accessible to authenticated users */}
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
      {showQuickTest && <QuickFirebaseTest />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;