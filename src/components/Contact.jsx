import React, { useState } from 'react';
import Button from './Button';
import { Mail } from './Icons';

const Contact = () => {
	const [formState, setFormState] = useState({ name: '', email: '', message: '' });
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('https://n8n.stepheng753.com/webhook/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formState),
			});

			if (response.ok) {
				console.log('Form submitted successfully:', formState);
				// Reset form
				setFormState({ name: '', email: '', message: '' });
				setIsSubmitted(true);
				setTimeout(() => setIsSubmitted(false), 5000);
			} else {
				console.error('Failed to submit form:', response.statusText);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
			<div className="container mx-auto px-6 max-w-4xl">
				<div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
					{/* Background Gradient */}
					<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-violet-100/50 dark:from-violet-500/10 to-cyan-100/50 dark:to-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

					<div className="text-center mb-12 relative z-10">
						<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to Accelerate?</h2>
						<p className="text-slate-600 dark:text-slate-400">
							Book a discovery call or send us a message. Let's find your flow.
						</p>
					</div>

					{isSubmitted && (
						<div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center relative z-10 flex items-center justify-center gap-2 transition-all duration-300">
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
							<span>Your message was sent successfully! We'll be in touch soon.</span>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6 relative z-10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium text-slate-700 dark:text-slate-300"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formState.name}
									onChange={handleChange}
									className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
									placeholder="John Doe"
									required
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-slate-700 dark:text-slate-300"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formState.email}
									onChange={handleChange}
									className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
									placeholder="john@company.com"
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
								How can we help?
							</label>
							<textarea
								id="message"
								name="message"
								value={formState.message}
								onChange={handleChange}
								rows={4}
								className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
								placeholder="Tell us about your automation needs..."
								required
							></textarea>
						</div>

						<div className="flex justify-center pt-4">
							<Button type="submit" variant="gradient" className="w-full md:w-auto min-w-[200px]">
								Send Message <Mail className="ml-2 w-4 h-4" />
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
