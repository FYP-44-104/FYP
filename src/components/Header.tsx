import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, LogOut, User } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import AuthForms from './AuthForms';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, loading: authLoading, logOut } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      // If on home page, scroll to the section
      scrollToSection(sectionId);
    } else {
      // If not on home page, navigate to home page with section hash
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Height of the fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Check if we should scroll to a section when the page loads
  useEffect(() => {
    if (isHomePage && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # character
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500); // Small delay to ensure the page has loaded
    }
  }, [location, isHomePage]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { label: 'Features', id: 'features' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Resources', id: 'resources' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="flex items-center space-x-2">
                <Activity className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-white">CWP</span>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </motion.button>
              ))}
              
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link 
                    to="/dashboard" 
                    className="text-primary hover:text-primary/90 transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2 text-white"
                  >
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-300">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </motion.div>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    onClick={handleLogout}
                    disabled={isLoggingOut || authLoading}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                  </motion.button>
                </div>
              ) : (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    onClick={() => setIsAuthOpen(true)}
                    disabled={authLoading}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
                    onClick={() => setIsAuthOpen(true)}
                    disabled={authLoading}
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-t border-gray-800"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item.id)}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {user && (
                    <Link 
                      to="/dashboard" 
                      className="text-primary hover:text-primary/90 transition-colors duration-300 text-left"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <div className="pt-4 border-t border-gray-800 flex flex-col space-y-4">
                    {user ? (
                      <>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <User className="w-4 h-4 text-primary" />
                          <span>{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                        </div>
                        <button 
                          className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-300"
                          onClick={handleLogout}
                          disabled={isLoggingOut || authLoading}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="text-gray-300 hover:text-white transition-colors duration-300"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsAuthOpen(true);
                          }}
                          disabled={authLoading}
                        >
                          Sign In
                        </button>
                        <button 
                          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsAuthOpen(true);
                          }}
                          disabled={authLoading}
                        >
                          Get Started
                        </button>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthForms 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        redirectPath={location.pathname === '/' ? '/' : location.pathname}
      />
    </>
  );
};

export default Header;