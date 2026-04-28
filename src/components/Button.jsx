import React from 'react';
import { ArrowRight } from './Icons';

const Button = ({
  children,
  variant = 'primary',
  showArrow = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-transparent",
    secondary: "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm",
    outline: "bg-transparent border border-cyan-600 dark:border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10",
    purple: "bg-violet-600 hover:bg-violet-500 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-transparent",
    gradient: "bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white border border-transparent hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default Button;