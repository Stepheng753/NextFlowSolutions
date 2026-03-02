import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './Home';
import IPLawHome from './IPLaw/IPLawHome';
import FigureConversion from './IPLaw/FigureConversion';
import PatentabilityAnalysis from './IPLaw/Patentability';
import PILawHome from './PILaw/PILawHome';
import MedicalContradiction from './PILaw/MedicalContradiction';
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
            case 'pi-law':
                return <PILawHome navigate={setView} />;
            case 'medical-contradiction':
                return <MedicalContradiction navigate={setView} />;
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
