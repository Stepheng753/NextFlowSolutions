import React, { useMemo } from 'react';
import HeroArrow from './HeroArrow';
import Button from './Button';
import NeuralBackground from './NeuralBackground';
import HeroImageSVG from './HeroImageSVG';

const Hero = ({ theme }) => {
  // Generate static random data for arrows so they don't jitter on re-render
  const arrows = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      const rand = Math.random();
      let variant = 'cyan';
      if (rand > 0.66) variant = 'purple';
      else if (rand > 0.33) variant = 'blue';

      items.push({
        id: i,
        y: Math.random() * 90 + 5, // 5% to 95% height
        delay: Math.random() * 2, // 0 to 2s delay
        scale: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 scale
        speed: Math.random() * 1.5 + 1, // 1s to 2.5s travel time
        xEnd: Math.random() * 40 + 40, // End between 40% and 80% width (Right side)
        variant: variant,
      });
    }
    return items;
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-slate-50 dark:bg-slate-950 pt-20 transition-colors duration-300">

      {/* 1. Neural Network Background (Base Layer) */}
      <NeuralBackground theme={theme} />

      {/* 2. Animated Ambient Gradients (Mid Layer) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-violet-200/30 dark:bg-violet-900/20 rounded-full blur-[120px] transition-all duration-[3000ms] animate-float" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-cyan-200/30 dark:bg-cyan-900/10 rounded-full blur-[100px] transition-all duration-[3000ms] animate-pulse" />
      </div>

      {/* 3. Animated Arrows (Overlay Layer) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-50 z-0">
        {arrows.map((arrow) => (
          <HeroArrow key={arrow.id} {...arrow} />
        ))}
      </div>

      {/* 4. Main Content (Top Layer) */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 lg:pl-8 xl:pl-16 2xl:pl-20">
          <div className="inline-block">
            <span className="py-1 px-3 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              NextFlow AI Automation
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
            Workflow <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-500 dark:to-violet-500">
              Evolved.
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed transition-colors duration-300">
            We don't just build bots; we engineer intelligence. Transform your business logic into fluid, automated reality with NextFlow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="gradient" showArrow onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Automation
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Solutions
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-8 flex gap-8 border-t border-slate-200 dark:border-slate-800/50 mt-8 transition-colors duration-300">
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">98%</p>
              <p className="text-sm text-slate-500">Efficiency Gain</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">24/7</p>
              <p className="text-sm text-slate-500">Active Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">10x</p>
              <p className="text-sm text-slate-500">ROI Average</p>
            </div>
          </div>
        </div>

        {/* Visual Anchor for Right Side */}
        <div className="hidden lg:flex justify-center items-center relative">
          {/* Main Circle Container */}
          <div className="relative w-96 h-96 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center z-20 transition-all duration-300 shadow-2xl shadow-violet-500/10 group">

            {/* Blurred Background Layer (Isolated to fix square blur glitch) */}
            <div className="absolute inset-0 rounded-full bg-white/30 dark:bg-slate-900/30 backdrop-blur-md overflow-hidden z-0"></div>

            {/* Gradient Pulse Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 animate-pulse z-0"></div>

            {/* SVG Image Overlay - Sits on top of background, behind text */}
            <div className="absolute inset-0 z-10 pointer-events-none scale-110 group-hover:scale-115 transition-transform duration-700 ease-in-out">
              <HeroImageSVG className="w-full h-full drop-shadow-2xl" />
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
