import React from 'react';
import { motion } from 'framer-motion';

const SocialSidebar = () => {
  const socials = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/rkarsoemyint', 
      color: 'bg-[#333]',
      icon: <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    },
    { 
      label: 'Email', 
      href: 'mailto:tzoo2024@gmail.com', 
      color: 'bg-[#EA4335]',
      icon: <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path><rect width="20" height="16" x="2" y="4" rx="2"></rect></svg>
    },
    { 
      label: 'Viber', 
      href: 'viber://chat?number=+959792460282', 
      color: 'bg-[#7360F2]',
      icon: <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    },
    { 
      label: 'Telegram', 
      href: 'https://t.me/tzoo2024', 
      color: 'bg-[#0088cc]',
      icon: <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    },
    { 
      label: 'Phone', 
      href: 'tel:+959792460282', 
      color: 'bg-[#34A853]',
      icon: <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    },
  ];

  return (
   
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-[9999] flex flex-row md:flex-col items-center md:items-start bg-gray-950/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-4 py-2 md:p-0 rounded-t-2xl md:rounded-none w-full max-w-sm md:w-auto justify-around md:justify-start gap-1 md:gap-0 shadow-2xl md:shadow-none border-t border-white/10 md:border-none">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          
         
          initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: 20, opacity: 0 } : { x: -100 }}
          animate={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: 0, opacity: 1 } : {}}
          whileHover={typeof window !== 'undefined' && window.innerWidth >= 768 ? { x: 0 } : { scale: 1.1 }}
          
          transition={{ type: 'spring', stiffness: 400, damping: 25, delay: index * 0.05 }}
          
          
          className={`flex items-center justify-center md:justify-between w-11 h-11 md:w-40 md:h-auto p-0 md:p-3 ${social.color} text-white rounded-xl md:rounded-none md:rounded-r-xl shadow-lg md:shadow-2xl md:mb-1 cursor-pointer group`}
        >
         
          <span className="hidden md:block text-xs font-bold ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {social.label}
          </span>
          
          <div className="bg-white/10 p-1.5 rounded-lg md:ml-auto group-hover:bg-white/20 transition-colors flex items-center justify-center">
            {social.icon}
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
