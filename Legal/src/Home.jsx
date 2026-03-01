import React from 'react';
import { Scale, Users } from 'lucide-react';

const Home = ({ navigate }) => (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Automated Legal Workflows
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Select a practice area to access specific AI pipelines and tools tailored for your legal domain.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* IP Law */}
            <div
                onClick={() => navigate('ip-law')}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Scale className="w-10 h-10 text-blue-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">IP Law</h3>
                <p className="text-slate-600 mb-6">
                    Access patent analysis and technical figure processing pipelines.
                </p>
                <span className="text-blue-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    View Workflows &rarr;
                </span>
            </div>

            {/* Family Law (Placeholder) */}
            <div
                onClick={() => navigate('family-law')}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center opacity-75"
            >
                <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-rose-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Family Law</h3>
                <p className="text-slate-600 mb-6">
                    Coming soon: Document automation and case analysis tools for family law practices.
                </p>
                <span className="text-rose-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    View Workflows &rarr;
                </span>
            </div>
        </div>
    </div>
);

export default Home;
