import React from 'react';
import optimizationImg from '../assets/optimization.png';

const About = () => {
	return (
		<section
			id="about"
			className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300"
		>
			{/* Decorative blob */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-200/20 dark:bg-violet-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-300"></div>

			<div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
				<div className="w-full md:w-1/2">
					<div className="relative">
						<div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-violet-600 rounded-2xl opacity-20 dark:opacity-30 blur-lg"></div>
						<img
							src={optimizationImg}
							alt="Team working on AI"
							className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full object-cover"
						/>
						<div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-xl hidden lg:block transition-colors duration-300">
							<p className="text-4xl font-bold text-slate-900 dark:text-white mb-1">45%</p>
							<p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
								Cost Reduction
							</p>
						</div>
					</div>
				</div>

				<div className="w-full md:w-1/2">
					<h2 className="text-cyan-600 dark:text-cyan-500 font-semibold tracking-wide uppercase text-sm mb-3">
						About NextFlow
					</h2>
					<h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
						We build the flows that power the future.
					</h3>
					<div className="space-y-6 text-slate-600 dark:text-slate-300">
						<p>
							The era of manual repetitive tasks is over. At NextFlow, we believe that human potential
							should be spent on creativity and strategy, not data entry.
						</p>
						<p>
							Our team of ML engineers and automation architects works backwards from your business goals.
							We identify bottlenecks, design fluid automated pipelines, and implement AI agents that work
							while you sleep.
						</p>
					</div>

					<div className="mt-8 grid grid-cols-2 gap-6">
						<div>
							<h4 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center">
								<div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
								Scalable Architecture
							</h4>
							<p className="text-xs text-slate-500">
								Systems that grow with you, handling millions of requests without breaking.
							</p>
						</div>
						<div>
							<h4 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center">
								<div className="w-2 h-2 bg-violet-500 rounded-full mr-2"></div>
								Secure by Design
							</h4>
							<p className="text-xs text-slate-500">
								Enterprise-grade encryption and data handling protocols.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
