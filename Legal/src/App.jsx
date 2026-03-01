import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './Home';
import IPLawHome from './IPLaw/IPLawHome';
import FigureConversion from './IPLaw/FigureConversion';
import PatentabilityAnalysis from './IPLaw/Patentability';
import './App.css';
import { CONFIG } from './config';

export default function App() {
    const [view, setView] = useState('home');
    const [activeClient, setActiveClient] = useState(CONFIG.defaultClient);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let matchedClient = null;

        for (const [key, value] of params.entries()) {
            const lowerKey = key.toLowerCase();
            const lowerValue = value ? value.toLowerCase() : '';

            matchedClient = CONFIG.clients.find(client =>
                client.keywords.includes(lowerKey) || client.keywords.includes(lowerValue)
            );

            if (matchedClient) break;
        }

        const currentClient = matchedClient || CONFIG.defaultClient;
        setActiveClient(currentClient);

        const favicon = document.getElementById('dynamic-favicon');
        const appleIcon = document.getElementById('dynamic-apple-icon');

        document.title = currentClient.name;
        if (favicon) favicon.href = `${import.meta.env.BASE_URL}${currentClient.logo}`;
        if (appleIcon) appleIcon.href = `${import.meta.env.BASE_URL}${currentClient.logo}`;
    }, []);    // Simple Router Switch
    const renderView = () => {
        switch (view) {
            case 'ip-law':
                return <IPLawHome navigate={setView} />;
            case 'figure':
                return <FigureConversion navigate={setView} />;
            case 'patent':
                return <PatentabilityAnalysis navigate={setView} />;
            case 'family-law':
                return (
                    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
                        <div className="mb-8">
                            <button
                                onClick={() => setView('home')}
                                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className="w-5 h-5"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                Back to Practices
                            </button>
                        </div>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4 font-serif text-slate-800">Family Law Workflows</h2>
                            <p className="text-slate-600 mb-8">Coming soon...</p>
                        </div>
                    </div>
                );
            case 'home':
            default:
                return <Home navigate={setView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
            <Header onHome={() => setView('home')} client={activeClient} />

            <main className="flex-1">
                {renderView()}
            </main>

            <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {activeClient.name}. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white">Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
