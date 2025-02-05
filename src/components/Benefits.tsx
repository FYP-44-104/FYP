import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, Zap, Users, 
  Clock, Globe, Workflow,
  MessageSquare, Activity
} from 'lucide-react';

const benefits = [
  {
    icon: Rocket,
    title: 'Increased Productivity',
    description: 'Boost team efficiency by 300% with automated workflows'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time updates with zero latency'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless communication across departments'
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description: 'Reduce meeting time by 50% with async updates'
  },
  {
    icon: MessageSquare,
    title: 'Team Chat',
    description: 'Integrated messaging and file sharing'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Work from anywhere with cloud-based platform'
  },
  {
    icon: Activity,
    title: 'Performance Tracking',
    description: 'Monitor and optimize team performance'
  },
  {
    icon: Workflow,
    title: 'Smart Workflows',
    description: 'Streamline processes with automation'
  }
];

const Benefits: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={containerRef} className="py-20 bg-black relative overflow-hidden">
      <motion.div
        style={{ y }}
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
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your workplace with cutting-edge collaboration tools
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-24">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-flex items-center gap-4 ${
                      index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <Icon className="w-8 h-8 text-primary" />
                      <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-400 mt-2">{benefit.description}</p>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  </div>
                  <div className="w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;