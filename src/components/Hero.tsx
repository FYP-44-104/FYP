import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Sparkles, Users } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate hero content with longer duration and no auto-reverse
    tl.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    }).to('.hero-content', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out'
    });

    // Animate hero image with persistence
    tl.from('.hero-image', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5').to('.hero-image', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out'
    });

    // Animate floating elements with a more subtle movement
    gsap.to('.floating-element', {
      y: -15,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });

    // Animate particles with varied timing
    const particles = gsap.utils.toArray('.particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: gsap.utils.random(-20, -40),
        duration: gsap.utils.random(2, 4),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 2)
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="hero-content text-center lg:text-left"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Transform Your Workplace
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Empower your team with our cutting-edge collaboration platform. Experience seamless communication and enhanced productivity.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 text-white rounded-full font-semibold text-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="mt-12 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="w-10 h-10 rounded-full border-2 border-black bg-gray-800"
                    />
                  ))}
                </div>
                <p className="text-gray-400">
                  <span className="text-white font-semibold">1000+</span> teams already joined
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
                <span className="text-gray-400">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image relative"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-full aspect-square">
              {/* Main platform preview */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl backdrop-blur-xl border border-white/10 p-4"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <div className="relative h-full rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                    alt="Platform Preview"
                    className="w-full h-full object-cover rounded-lg opacity-75"
                  />
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div 
                className="floating-element absolute -top-6 -left-6"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-32 h-32 bg-primary/20 rounded-2xl backdrop-blur-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <Activity className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <motion.div 
                className="floating-element absolute top-1/2 -right-6"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-32 h-32 bg-secondary/20 rounded-2xl backdrop-blur-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <Users className="w-12 h-12 text-secondary" />
                </div>
              </motion.div>
              <motion.div 
                className="floating-element absolute -bottom-6 left-1/2 -translate-x-1/2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-32 h-32 bg-accent/20 rounded-2xl backdrop-blur-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-12 h-12 text-accent" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;