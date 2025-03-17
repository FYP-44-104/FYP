import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../config/firebase';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we need to redirect to a specific section
  useEffect(() => {
    // If the URL has a hash, redirect to the landing page with that hash
    if (location.hash) {
      navigate(`/${location.hash}`);
    }
  }, [location.hash, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome to Collaborative Workplace Platform
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            A modern platform for teams to collaborate, manage projects, and achieve their goals together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/#features')}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Features
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/#pricing')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Pricing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth-test')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
            >
              Test Authentication
            </motion.button>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/firebase-debug')}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg text-md font-medium hover:bg-gray-600 transition-colors"
            >
              Debug Firebase
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/firebase-setup')}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg text-md font-medium hover:bg-gray-600 transition-colors"
            >
              Firebase Setup Guide
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/#contact')}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg text-md font-medium hover:bg-gray-600 transition-colors"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 