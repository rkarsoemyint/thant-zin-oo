import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react'; // အစ်ကို့ style အတိုင်း ပြောင်းလဲထားပါတယ်

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Navigation Links
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech', href: '#techstack' },
    { label: 'CV', href: '#cv' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md shadow-md z-[999] px-6 py-4 flex justify-between items-center transition-colors duration-300">
      
      {/* Logo Section */}
      <Link to="/" className="text-2xl font-bold flex items-center" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>
        <span className="text-gray-800 dark:text-white uppercase tracking-tighter">Thant</span>
        <div className="ml-2 flex space-x-0.5 font-mono text-sm">
          <span className="text-red-500 font-bold">&lt;</span>
          <span className="text-yellow-500 font-bold">/</span>
          <span className="text-green-500 font-bold">&gt;</span>
        </div>
      </Link>

      {/* Desktop Navigation (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-8 items-center font-medium">
        {navItems.map((item) => (
          <a 
            key={item.label}
            href={item.href} 
            className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300 group py-1 text-sm lg:text-base"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:ring-2 ring-blue-400 transition-all active:scale-95 ml-2"
        >
          {isDark ? (
            <Icons.Sun size={18} className="text-yellow-400" />
          ) : (
            <Icons.Moon size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Control Section (Icons on the right) */}
      <div className="flex md:hidden items-center gap-3">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all"
        >
          {isDark ? <Icons.Sun size={20} className="text-yellow-400" /> : <Icons.Moon size={20} className="text-gray-600" />}
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
        >
          {isOpen ? <Icons.X size={26} /> : <Icons.Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-8 px-8 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="block text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
};

export default Navbar;