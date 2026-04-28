import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import UglowApp from "./clients/uglow";
import AuthWrapper from "./clients/uglow/AuthWrapper";

const MainSite = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        // Check localStorage or system preference on mount
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-violet-500/30 selection:text-violet-700 dark:selection:text-violet-100 transition-colors duration-300">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Hero theme={theme} />
                <Services />
                <About />
                <Process />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSite />} />
                <Route 
                    path="/clients/Uglow/*" 
                    element={
                        <AuthWrapper>
                            <UglowApp />
                        </AuthWrapper>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
