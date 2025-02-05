import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const LoadingScreen: React.FC<{ onLoadComplete: () => void }> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mb-8"
      >
        <Activity size={64} className="text-[#FF6F61]" />
      </motion.div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#FF6F61]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        className="mt-4 text-[#40E0D0] font-mono text-lg glitch"
        data-text={`Loading... ${progress}%`}
      >
        Loading... {progress}%
      </motion.p>

      <div className="scanline" />
    </motion.div>
  );
};

export default LoadingScreen;