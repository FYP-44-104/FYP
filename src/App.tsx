import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import ProductShowcase from './components/ProductShowcase';
import TechnicalFeatures from './components/TechnicalFeatures';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/animations.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <div className="min-h-screen bg-black text-white">
          <Header />
          <Hero />
          <Features />
          <Benefits />
          <ProductShowcase />
          <TechnicalFeatures />
          <Testimonials />
          <Pricing />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;