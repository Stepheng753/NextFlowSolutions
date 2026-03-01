import React from 'react';
import { FileImage, Gavel, ArrowLeft } from 'lucide-react';

const IPLawHome = ({ navigate }) => (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
        <div className="mb-8">
            <button
                onClick={() => navigate('home')}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Practices
            </button>
        </div>

        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                IP Law Workflows
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Leverage our proprietary AI pipelines to accelerate patent analysis and technical figure processing. Secure, efficient, and reliable.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div
                onClick={() => navigate('figure')}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
                <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileImage className="w-10 h-10 text-amber-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Figure Conversion</h3>
                <p className="text-slate-600 mb-6">
                    Upload rough sketches or diagrams and receive USPTO-ready compliant figures using our generative image model.
                </p>
                <span className="text-amber-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Start Conversion &rarr;
                </span>
            </div>

            {/* Card 2 */}
            <div
                onClick={() => navigate('patent')}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Gavel className="w-10 h-10 text-slate-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Patentability Analysis</h3>
                <p className="text-slate-600 mb-6">
                    Submit Invention Disclosure Forms (IDFs) for instant prior art cross-referencing and novelty assessment reports.
                </p>
                <span className="text-slate-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Begin Analysis &rarr;
                </span>
            </div>
        </div>
    </div>
);

export default IPLawHome;
