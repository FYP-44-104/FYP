import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';
import AuthForms from './AuthForms';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMobileMenuOpen(false);
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
              <Activity className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">CWP</span>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => setIsAuthOpen(true)}
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
              >
                Get Started
              </motion.button>
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
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-4 border-t border-gray-800 flex flex-col space-y-4">
                    <button 
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsAuthOpen(true);
                      }}
                    >
                      Sign In
                    </button>
                    <button 
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsAuthOpen(true);
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthForms isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;