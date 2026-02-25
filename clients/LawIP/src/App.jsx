import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './Home';
import FigureConversion from './FigureConversion';
import PatentabilityAnalysis from './Patentability';
import './App.css';

export default function App() {
    const [view, setView] = useState('home');
    const [isTorreyPines, setIsTorreyPines] = useState(false);

    useEffect(() => {
        const torreyKeywords = ['torreypineslaw', 'torreypineslawgroup', 'torreypinesconsulting', 'tpl', 'tpc'];
        const params = new URLSearchParams(window.location.search);
        let match = false;

        for (const [key, value] of params.entries()) {
            if (torreyKeywords.includes(key.toLowerCase()) || (value && torreyKeywords.includes(value.toLowerCase()))) {
                match = true;
                break;
            }
        }

        setIsTorreyPines(match);

        const favicon = document.getElementById('dynamic-favicon');
        const appleIcon = document.getElementById('dynamic-apple-icon');

        if (match) {
            document.title = "Torrey Pines Law Group";
            if (favicon) favicon.href = `${import.meta.env.BASE_URL}torreypineslaw.png`;
            if (appleIcon) appleIcon.href = `${import.meta.env.BASE_URL}torreypineslaw.png`;
        } else {
            document.title = "Placeholder Law Group";
            if (favicon) favicon.href = `${import.meta.env.BASE_URL}generic.avif`;
            if (appleIcon) appleIcon.href = `${import.meta.env.BASE_URL}generic.avif`;
        }
    }, []);    // Simple Router Switch
    const renderView = () => {
        switch (view) {
            case 'figure':
                return <FigureConversion navigate={setView} />;
            case 'patent':
                return <PatentabilityAnalysis navigate={setView} />;
            case 'home':
            default:
                return <Home navigate={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
            <Header onHome={() => setView('home')} isTorreyPines={isTorreyPines} />

            <main className="pb-20">
                {renderView()}
            </main>

            <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {isTorreyPines ? "Torrey Pines Law Group" : "Placeholder Law Group"}. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white">Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
