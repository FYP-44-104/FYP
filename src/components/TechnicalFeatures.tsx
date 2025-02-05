import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap,
  Users,
  Workflow,
  Clock,
  MessageSquare
} from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Time Saving',
    description: 'Reduce meeting time and streamline workflows',
    stats: ['50% less meetings', 'Automated updates', 'Quick actions']
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Built for seamless team collaboration and communication',
    stats: ['Real-time updates', 'Team channels', 'File sharing']
  },
  {
    icon: Workflow,
    title: 'Smart Workflows',
    description: 'Streamline your processes with automated workflows',
    stats: ['Custom triggers', 'Action chains', 'Integrations']
  },
  {
    icon: MessageSquare,
    title: 'Team Chat',
    description: 'Integrated messaging platform for effective communication',
    stats: ['Instant messaging', 'Thread discussions', 'Rich media sharing']
  }
];

const TechnicalFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="solutions" ref={containerRef} className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Enterprise-Grade Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with scalability and performance at its core
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-800 hover:border-primary/50 transition-colors group"
            >
              <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:text-accent transition-colors duration-300" />
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              <div className="grid grid-cols-1 gap-3">
                {feature.stats.map((stat, statIndex) => (
                  <div
                    key={statIndex}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {stat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: 'Time Saved', value: '50%' },
            { icon: Users, label: 'Active Teams', value: '5000+' },
            { icon: MessageSquare, label: 'Messages/Day', value: '1M+' },
            { icon: Zap, label: 'Task Completion', value: '2x' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 text-center hover:bg-gray-800 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalFeatures;