import React from 'react';


import kanoteTopRight from '../assets/kanote-style-2.png'; 
import kanoteBottomLeft from '../assets/kanote-style-1.png'; 

const KanoteBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      
<div className="absolute top-15 -right-20 w-87 h-87"> 
  <img 
    src={kanoteTopRight} 
    alt="kanote decorative ornament top right" 
    className="w-full h-full object-contain opacity-10 dark:opacity-30 transition-opacity duration-500" 
  />
</div>

      <div className="absolute -bottom-10 -left-42 w-150 h-150">
        <img 
          src={kanoteBottomLeft} 
          alt="kanote decorative ornament bottom left" 
          className="w-full h-full object-contain opacity-1 dark:opacity-50 transition-opacity duration-500" 
        />
      </div>

    </div>
  );
};

export default KanoteBackground;