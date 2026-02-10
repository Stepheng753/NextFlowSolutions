import React from 'react';

const HeroImageSVG = ({ className }) => {
    return (
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className={className}>
            <style dangerouslySetInnerHTML={{
                __html: `
        /* --- Animations --- */
        @keyframes flow-1 {
            from { stroke-dashoffset: 290; }
            to { stroke-dashoffset: 0; }
        }

        @keyframes flow-2 {
            from { stroke-dashoffset: -340; }
            to { stroke-dashoffset: 0; }
        }

        @keyframes flow-center {
            from { stroke-dashoffset: 260; }
            to { stroke-dashoffset: 0; }
        }

        @keyframes flow-ring {
            from { stroke-dashoffset: 170; }
            to { stroke-dashoffset: 0; }
        }

        @keyframes pulse-node {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }

        /* SVG Internal Classes */
        .bg-path {
            fill: none;
            stroke: #1e293b; /* Slate-800 for dark mode contrast */
            stroke-width: 15;
            stroke-linecap: round;
            opacity: 0.2;
        }
        
        .dark .bg-path {
             stroke: #cbd5e1; /* Slate-300 for light mode */
             opacity: 0.1;
        }

        /* Top Curve */
        .flow-path {
            fill: none;
            stroke: url(#gradient1);
            stroke-width: 15;
            stroke-linecap: round;
            stroke-dasharray: 40 250;
            animation: flow-1 3s linear infinite;
        }

        /* Bottom Curve */
        .flow-path-delayed {
            fill: none;
            stroke: url(#gradient2);
            stroke-width: 15;
            stroke-linecap: round;
            stroke-dasharray: 40 300;
            animation: flow-2 3.5s linear infinite;
        }

        /* Orbit Ring */
        .flow-path-fast {
            fill: none;
            stroke: url(#gradient3);
            stroke-width: 6;
            stroke-linecap: round;
            stroke-dasharray: 20 150;
            animation: flow-ring 1.5s linear infinite;
        }

        /* Center Shaft */
        .flow-path-center {
            fill: none;
            stroke: url(#gradient1);
            stroke-width: 15;
            stroke-linecap: round;
            stroke-dasharray: 60 200;
            animation: flow-center 3s linear infinite;
        }

        .node {
            fill: #06b6d4; /* Cyan-500 */
            filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0.5));
            animation: pulse-node 3s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
        }
      ` }} />

            <defs>
                {/* Gradient 1: Cyan to Blue */}
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                </linearGradient>

                {/* Gradient 2: Purple to Pink */}
                <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f472b6" stopOpacity="1" />
                </linearGradient>

                {/* Gradient 3: Bright White/Blue */}
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Grouping for the Arrow shape */}
            <g transform="translate(50, 50) scale(0.75)">

                {/* Top Wing */}
                <path className="bg-path stroke-slate-800 dark:stroke-slate-200" d="M50,60 C150,60 250,120 380,200" />
                <path className="flow-path" d="M50,60 C150,60 250,120 380,200" />

                {/* Bottom Wing */}
                <path className="bg-path stroke-slate-800 dark:stroke-slate-200" d="M50,340 C150,340 250,280 380,200" />
                <path className="flow-path-delayed" d="M50,340 C150,340 250,280 380,200" />

                {/* Center Shaft (Direct Flow) */}
                <path className="bg-path stroke-slate-800 dark:stroke-slate-200" d="M20,200 L380,200" />
                <path className="flow-path-center" d="M20,200 L380,200" />

                {/* Extra decorative orbit/ring revolving around the arrow body */}
                <ellipse cx="180" cy="200" rx="100" ry="160" fill="none" stroke="#1e293b" strokeWidth="2" transform="rotate(-90 180 200)" className="opacity-20 dark:opacity-50 dark:stroke-slate-700" />
                <path className="flow-path-fast" d="M180,40 A100,160 -90 0 1 180,360" transform="rotate(-90 180 200)" style={{ opacity: 0.8 }} />

                {/* Connection Nodes (Circles) */}
                <circle className="node" cx="50" cy="60" r="10" />
                <circle className="node" cx="50" cy="340" r="10" />
                <circle className="node" cx="20" cy="200" r="8" />

                {/* The Focal Point (Arrow Tip) */}
                <circle className="node" cx="380" cy="200" r="14" />

            </g>
        </svg>
    );
};

export default HeroImageSVG;
