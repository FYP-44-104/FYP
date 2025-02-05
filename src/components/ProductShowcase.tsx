import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Tablet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.showcase-section');
    
    sections.forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen bg-black relative py-20 overflow-hidden">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Cross-Platform Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Work seamlessly across your devices with our responsive platform
          </p>
        </motion.div>

        <div className="space-y-32">
          <div className="showcase-section flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <Monitor className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4 text-white">Desktop Experience</h3>
              <p className="text-gray-400 mb-6">
                Full-featured desktop interface with advanced tools and shortcuts for power users.
              </p>
              <div className="relative w-full h-[300px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                  alt="Desktop Interface"
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
            </div>
            <motion.div
              style={{ y }}
              className="md:w-1/2 space-y-4"
            >
              {['Real-time collaboration', 'Advanced analytics', 'Custom workflows'].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg border border-gray-800"
                >
                  <p className="text-white">{feature}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="showcase-section flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div className="md:w-1/2">
              <Tablet className="w-16 h-16 text-secondary mb-6" />
              <h3 className="text-3xl font-bold mb-4 text-white">Tablet Optimized</h3>
              <p className="text-gray-400 mb-6">
                Touch-friendly interface with gesture controls and responsive design.
              </p>
              <div className="relative w-full h-[300px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80"
                  alt="Tablet Interface"
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
            </div>
            <motion.div
              style={{ y }}
              className="md:w-1/2 space-y-4"
            >
              {['Touch gestures', 'Split-screen mode', 'Digital pen support'].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg border border-gray-800"
                >
                  <p className="text-white">{feature}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;