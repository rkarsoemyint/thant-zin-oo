import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
        <p>© 2025 <span className="text-gray-900 dark:text-white font-bold">Thant Zin Oo</span>. All rights reserved</p>
        
        <div className="flex items-center">
          <span className="mx-1">&</span>
          {/* နှလုံးခုန်နေတဲ့ Animation */}
          <motion.span
            animate={{
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block text-red-500 text-xl cursor-pointer"
          >
            ❤️
          </motion.span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;