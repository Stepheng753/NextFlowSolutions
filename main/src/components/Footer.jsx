import React from 'react';
import { Zap } from './Icons';

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-violet-600 rounded flex items-center justify-center text-white">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="text-lg font-bold text-slate-700 dark:text-slate-200">NextFlow</span>
        </div>

        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} NextFlow AI Agency. All rights reserved.
        </div>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Twitter</a>
          <a href="#" className="text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">LinkedIn</a>
          <a href="#" className="text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;