import React from 'react';
import { BarChart3, BrainCircuit, Bot, Zap } from './Icons';

const steps = [
    {
        title: 'Discovery & Consultation',
        description: 'We dive deep into your existing workflows, identifying bottlenecks and opportunities where AI can drive the most ROI.',
        icon: BarChart3,
        colorTheme: 'cyan',
    },
    {
        title: 'Strategy & Architecture',
        description: 'Our team designs a bespoke AI architecture, mapping out the precise data pipelines, models, and integrations needed.',
        icon: BrainCircuit,
        colorTheme: 'blue',
    },
    {
        title: 'Development & Training',
        description: 'We build, train, and test custom LLMs and automated workflows on your proprietary data in a secure environment.',
        icon: Bot,
        colorTheme: 'violet',
    },
    {
        title: 'Deployment & Optimization',
        description: 'Seamless integration into your tech stack with continuous monitoring, fine-tuning, and support to ensure peak performance.',
        icon: Zap,
        colorTheme: 'fuchsia',
    }
];

const getStepStyles = (theme) => {
    switch (theme) {
        case 'cyan': return { bg: 'bg-cyan-50/50 dark:bg-cyan-900/20', border: 'hover:border-cyan-500/50 dark:hover:border-cyan-500/50', text: 'text-cyan-600 dark:text-cyan-500', icon: 'text-cyan-600 dark:text-cyan-400' };
        case 'blue': return { bg: 'bg-blue-50/50 dark:bg-blue-900/20', border: 'hover:border-blue-500/50 dark:hover:border-blue-500/50', text: 'text-blue-600 dark:text-blue-500', icon: 'text-blue-600 dark:text-blue-400' };
        case 'violet': return { bg: 'bg-violet-50/50 dark:bg-violet-900/20', border: 'hover:border-violet-500/50 dark:hover:border-violet-500/50', text: 'text-violet-600 dark:text-violet-500', icon: 'text-violet-600 dark:text-violet-400' };
        case 'fuchsia': return { bg: 'bg-fuchsia-50/50 dark:bg-fuchsia-900/20', border: 'hover:border-fuchsia-500/50 dark:hover:border-fuchsia-500/50', text: 'text-fuchsia-600 dark:text-fuchsia-500', icon: 'text-fuchsia-600 dark:text-fuchsia-400' };
        default: return { bg: 'bg-slate-50 dark:bg-slate-800/50', border: 'hover:border-slate-500/50 dark:hover:border-slate-500/50', text: 'text-slate-600 dark:text-slate-500', icon: 'text-slate-600 dark:text-slate-400' };
    }
};

const Process = () => {
    return (
        <section id="process" className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900/80 dark:to-slate-900 relative transition-colors duration-300">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-violet-600 dark:text-violet-500 font-semibold tracking-wide uppercase text-sm mb-3">
                        How We Work
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        Our Proven Methodology
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        A structured, transparent approach to transforming your operations with enterprise-grade AI solutions.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative pb-0">
                    {/* Vertical Line */}
                    <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2"></div>

                    <div className="space-y-4 md:space-y-0 relative md:h-[1130px]">
                        {/* Process Line Icons positioned at global fixed depths to guarantee equidistance */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 z-20 w-14 pointer-events-none">
                            {steps.map((step, idx) => {
                                const styles = getStepStyles(step.colorTheme);
                                return (
                                    <div key={`icon-${idx}`}
                                        className={`absolute left-0 w-14 h-14 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center transform -translate-y-1/2 transition-colors duration-300`}
                                        style={{ top: `${idx * 270 + 160}px` }}>
                                        <step.icon className={`w-6 h-6 ${styles.icon}`} />
                                    </div>
                                );
                            })}
                        </div>
                        {steps.map((step, idx) => {
                            const styles = getStepStyles(step.colorTheme);
                            // On desktop, we position the cards absolutely down the line to create the precise interlocking layout.
                            // Each subsequent card starts exactly 200px below the previous one.
                            const mobileLayout = `relative flex flex-col items-start mt-12`;
                            const desktopLayout = `md:absolute md:w-full md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse md:left-0' : 'md:left-0'} md:top-[${idx * 270}px]`;
                            const desktopSpacing = idx === 0 ? 'md:top-0' : idx === 1 ? 'md:top-[270px]' : idx === 2 ? 'md:top-[540px]' : 'md:top-[810px]';

                            return (
                                <div key={idx} className={`${mobileLayout} ${desktopLayout} ${desktopSpacing}`}>
                                    {/* Center Icon (Mobile Only) */}
                                    <div className="absolute left-0 top-8 md:hidden w-14 h-14 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center z-10 transition-colors duration-300">
                                        <step.icon className={`w-6 h-6 ${styles.icon}`} />
                                    </div>

                                    {/* Content */}
                                    <div className={`ml-20 md:ml-0 flex flex-col justify-start md:pt-0 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto text-left'}`}>
                                        <div className={`${styles.bg} rounded-3xl p-8 md:p-10 lg:p-12 border border-slate-100 dark:border-slate-800 ${styles.border} transition-colors duration-300 group shadow-lg dark:shadow-none flex flex-col justify-center w-full md:w-[350px] lg:w-[400px] md:h-[350px] lg:h-[320px]`}>
                                            <div className={`${styles.text} font-bold text-5xl mb-4 opacity-70 dark:opacity-40 transition-opacity duration-300`}>
                                                0{idx + 1}
                                            </div>
                                            <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                                {step.title}
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
