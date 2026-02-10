import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
    const base = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const styles = {
        primary: "bg-slate-800 text-white hover:bg-slate-700 shadow-md hover:shadow-lg",
        accent: "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg",
        outline: "border-2 border-slate-300 text-slate-700 hover:border-slate-800 hover:text-slate-900",
        danger: "bg-red-600 text-white hover:bg-red-700",
        success: "bg-emerald-600 text-white hover:bg-emerald-700"
    };

    return (
        <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
