import React from 'react';
import kanoteTopRight from '../assets/kanote-style-2.png'; 
import kanoteBottomLeft from '../assets/kanote-style-1.png'; 

const KanoteBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* Top Right Kanote */}
      <div className="absolute top-15 -right-20 w-87 h-87"> 
        <img 
          src={kanoteTopRight} 
          alt="kanote decorative ornament top right" 
          
          className="w-full h-full object-contain opacity-10 dark:opacity-20 dark:invert transition-all duration-500" 
        />
      </div>

      {/* Bottom Left Kanote */}
      <div className="absolute -bottom-10 -left-42 w-150 h-150">
        <img 
          src={kanoteBottomLeft} 
          alt="kanote decorative ornament bottom left" 
         
          className="w-full h-full object-cover opacity-5 dark:opacity-15 dark:invert transition-all duration-500" 
        />
      </div>

    </div>
  );
};

export default KanoteBackground;
