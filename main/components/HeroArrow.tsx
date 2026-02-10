import React, { useEffect, useState } from 'react';
import { ArrowProp } from '../types';

const HeroArrow: React.FC<ArrowProp> = ({ delay, y, scale, speed, xEnd, variant }) => {
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasArrived(true);
    }, (delay * 1000) + (speed * 1000));

    return () => clearTimeout(timer);
  }, [delay, speed]);

  let colorClass = '';
  switch (variant) {
    case 'cyan':
      colorClass = 'text-cyan-600/40 dark:text-cyan-500/40';
      break;
    case 'purple':
      colorClass = 'text-violet-600/40 dark:text-violet-500/40';
      break;
    case 'blue':
    default:
      colorClass = 'text-blue-600/40 dark:text-blue-500/40';
      break;
  }

  return (
    <div
      className={`absolute transition-all ease-out will-change-transform ${colorClass}`}
      style={{
        top: `${y}%`,
        left: hasArrived ? `${xEnd}%` : '-10%', // Start off-screen left
        transitionDuration: hasArrived ? '2s' : `${speed}s`,
        transitionDelay: hasArrived ? '0s' : `${delay}s`,
        transform: `scale(${scale})`,
        zIndex: 0
      }}
    >
      <div className={`${hasArrived ? 'animate-float' : ''}`}>
        {/* Custom Arrow Shape SVG */}
        <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M0 12H50" stroke="currentColor" strokeWidth="2" />
           <path d="M40 2L50 12L40 22" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default HeroArrow;