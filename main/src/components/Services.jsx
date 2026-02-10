import React from 'react';
import { BrainCircuit, Bot, BarChart3, Zap, ArrowRight } from './Icons';

const services = [
	{
		title: 'Intelligent Chatbots',
		description: 'Custom-trained LLMs that handle customer support, internal queries, and lead qualification 24/7.',
		icon: Bot,
	},
	{
		title: 'Workflow Automation',
		description: 'Connect your disparate apps (CRM, Email, Slack) into a seamless, self-driving ecosystem.',
		icon: Zap,
	},
	{
		title: 'Predictive Analytics',
		description:
			'Turn raw data into actionable foresight using advanced machine learning models tailored to your niche.',
		icon: BarChart3,
	},
	{
		title: 'Cognitive Process AI',
		description: 'Automate complex decision-making tasks that usually require human intervention.',
		icon: BrainCircuit,
	},
];

// Helper to get styles based on index
const getCardStyles = (index) => {
	if (index % 3 === 0) {
		// Cyan
		return {
			hoverBorder: 'hover:border-cyan-500/50 dark:hover:border-cyan-500/50',
			iconBg: 'text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500',
			text: 'text-cyan-600 dark:text-cyan-500',
		};
	} else if (index % 3 === 1) {
		// Blue
		return {
			hoverBorder: 'hover:border-blue-500/50 dark:hover:border-blue-500/50',
			iconBg: 'text-blue-600 dark:text-blue-400 group-hover:bg-blue-500',
			text: 'text-blue-600 dark:text-blue-500',
		};
	} else {
		// Purple
		return {
			hoverBorder: 'hover:border-violet-500/50 dark:hover:border-violet-500/50',
			iconBg: 'text-violet-600 dark:text-violet-400 group-hover:bg-violet-500',
			text: 'text-violet-600 dark:text-violet-500',
		};
	}
};

const Services = () => {
	return (
		<section id="services" className="py-24 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
			{/* Subtle grid background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.3] dark:opacity-[0.05]"></div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-cyan-600 dark:text-cyan-500 font-semibold tracking-wide uppercase text-sm mb-3">
						Our Expertise
					</h2>
					<h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
						Intelligence as a Service
					</h3>
					<p className="text-slate-600 dark:text-slate-400">
						We don't offer generic tools. We build bespoke AI infrastructures that integrate perfectly with
						your existing business stack.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, idx) => {
						const styles = getCardStyles(idx);
						return (
							<div
								key={idx}
								className={`group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 ${styles.hoverBorder} hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-none`}
							>
								<div
									className={`w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6 ${styles.iconBg} group-hover:text-white dark:group-hover:text-slate-950 transition-colors duration-300`}
								>
									<service.icon />
								</div>
								<h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
									{service.title}
								</h4>
								<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
									{service.description}
								</p>
								<div
									className={`flex items-center ${styles.text} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
								>
									<span>Learn more</span>
									<ArrowRight className="ml-2 w-4 h-4" />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Services;
