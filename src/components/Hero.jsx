import React from 'react';
import Typewriter from 'typewriter-effect';
import heroImg from '../assets/logo.png';
import * as Icons from 'lucide-react'; 

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-transparent transition-colors">
      
      <div className="relative z-10 flex flex-col items-center">
        
        <div className="mb-8 flex justify-center items-center">
          <div className="profile-border-container w-52 h-52 md:w-60 md:h-60 shadow-xl overflow-hidden rounded-full border-4 border-blue-600/20">
            <img 
              src={heroImg} 
              alt="Thant Zin Oo" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">
        THANT ZIN OO | <span className="text-blue-600 text-[0.8em]">Digital Portfolio</span>
      </h1>

      <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium h-12">
        <Typewriter
          options={{
            strings: [
              "I'm a passionate Full Stack Learner",
              "I'm a Web Engineer", 
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            delay: 75,
          }}
        />
      </div>

      {/* Button */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {/* Resume Button */}
        <a href="#cv">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2 active:scale-95">
            <Icons.FileText size={18} /> My Resume
          </button>
        </a>

        {/* Explore Projects Button */}
        <a href="#projects" className="relative group p-[2px] rounded-full overflow-hidden inline-block">
  
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#3B82F6_50%,#E2E8F0_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  
  <button className="relative z-10 flex items-center gap-2 px-8 py-3 rounded-full bg-white dark:bg-gray-950 text-blue-600 dark:text-blue-400 font-bold transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
    
    <span className="relative flex items-center gap-2">
      Explore Projects
      <Icons.ArrowRight 
        size={18} 
        className="transition-transform duration-300 group-hover:translate-x-1" 
      />
    </span>

  </button>
</a>

        {/* Get in Touch Button */}
        <a href="#contact">
          <button className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 active:scale-95">
            Get in Touch
          </button>
        </a>
      </div>
    </section>
  );
};

export default Hero;