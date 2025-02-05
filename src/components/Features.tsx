import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { 
  Share2, Clock, Users, 
  Workflow, MessageSquare, Shield,
  Zap, Database
} from 'lucide-react';

const features = [
  {
    icon: Share2,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with live cursors and instant updates'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and advanced access controls'
  },
  {
    icon: Database,
    title: 'Smart Storage',
    description: 'Intelligent data organization with version control'
  },
  {
    icon: Workflow,
    title: 'Automated Workflows',
    description: 'Streamline processes with custom automation rules'
  },
  {
    icon: MessageSquare,
    title: 'Team Chat',
    description: 'Rich messaging with threads and file sharing'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Organize teams with roles and permissions'
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Monitor productivity and project timelines'
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Shortcuts and commands for power users'
  }
];

const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}> = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="w-12 h-12 mb-4 text-primary group-hover:text-accent transition-colors duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const stats = gsap.utils.toArray('.stat-number');
    stats.forEach((stat) => {
      gsap.to(stat, {
        innerHTML: stat.getAttribute('data-value'),
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top center+=100',
          once: true
        },
        snap: { innerHTML: 1 }
      });
    });
  }, { scope: statsRef });

  return (
    <section id="features" className="py-20 bg-black" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your team and projects effectively
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 10000, label: 'Active Users' },
            { value: 5000, label: 'Teams' },
            { value: 1000000, label: 'Tasks Completed' },
            { value: 50, label: 'Time Saved %' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-3xl font-bold mb-2 text-primary">
                <span className="stat-number" data-value={stat.value}>0</span>
                {stat.label.includes('%') ? '%' : '+'}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;