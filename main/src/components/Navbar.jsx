import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Sun, Moon } from './Icons';
import Button from './Button';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-4 shadow-sm dark:shadow-none'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            NextFlow
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Button variant="outline" className="!py-2 !px-4 text-xs" onClick={() => window.location.href = '/Legal/'}>
            Legal Workflows
          </Button>

          <Button variant="purple" className="!py-2 !px-4 text-xs" onClick={() => scrollToSection('#contact')}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="text-slate-900 dark:text-slate-300 hover:text-violet-600 dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 md:hidden flex flex-col space-y-4 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-left text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium py-2"
            >
              {item.label}
            </button>
          ))}
          <Button variant="outline" className="w-full justify-center" onClick={() => window.location.href = '/Legal/'}>
            Legal Workflows
          </Button>
          <Button variant="gradient" className="w-full justify-center" onClick={() => scrollToSection('#contact')}>
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;