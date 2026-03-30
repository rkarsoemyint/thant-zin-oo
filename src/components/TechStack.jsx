import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react'; 

const TechStack = () => {
  const stacks = [
    {
      title: "Frontend Development",
      iconName: "Code2", 
      iconColor: "text-blue-500",
      tools: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide Icons"]
    },
    {
      title: "Backend & Database",
      iconName: "Database",
      iconColor: "text-green-500",
      tools: ["Firebase Firestore", "Firebase Auth", "NoSQL Architecture"]
    },
    {
      title: "Performance & Tools",
      iconName: "Cpu",
      iconColor: "text-purple-500",
      tools: ["Vite", "ESLint", "NPM", "PostCSS"]
    },
    {
      title: "Deployment",
      iconName: "Globe",
      iconColor: "text-orange-500",
      tools: ["Vercel Hosting", "GitHub Actions", "SSL Encryption"]
    }
  ];

  return (
    <section id="techstack" className="py-24 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white transition-colors">
            How This Portfolio is <span className="text-blue-600">Built</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto italic">
            "Behind every great user experience is a well-crafted technical architecture."
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {stacks.map((stack, index) => {
            // Icon ကို Dynamic ခေါ်ယူခြင်း
            const IconComponent = Icons[stack.iconName]; 
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 shadow-xl shadow-gray-200/20 dark:shadow-none"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-inner ${stack.iconColor}`}>
                    {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-3 py-1 border border-gray-200 dark:border-gray-800 rounded-full">
                    Module {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold dark:text-white mb-6 group-hover:text-blue-600 transition-colors">
                  {stack.title}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {stack.tools.map(tool => (
                    <span 
                      key={tool} 
                      className="px-4 py-1.5 bg-gray-100/50 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 text-xs rounded-xl font-semibold border border-transparent hover:border-blue-500/20 hover:text-blue-600 transition-all cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;