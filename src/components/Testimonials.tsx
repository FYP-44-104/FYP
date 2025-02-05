import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'This platform has transformed how our team collaborates. The real-time features are game-changing.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO at StartupX',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'The security features and enterprise-grade tools have made this our go-to collaboration platform.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Team Lead at DesignCo',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    content: 'Intuitive interface and powerful features. Our team productivity has increased significantly.',
    rating: 5
  }
];

const companies = [
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=200&q=80'
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-white mb-8">Trusted by Global Brands</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {companies.map((logo, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={logo}
                alt="Company logo"
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex gap-2 items-center justify-center bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full px-6 py-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">4.9/5 average rating</span>
          </div>
          <p className="text-gray-400">Based on 1000+ customer reviews</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;