import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  Github, 
  Twitter, 
  Linkedin, 
  Mail 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div id="resources" className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-white">CWP</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your workplace with our cutting-edge collaboration platform.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Security', 'Team', 'Enterprise', 'Pricing'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Guides', 'Support', 'Partners'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="contact" className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Collaborative Workplace Platform. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;