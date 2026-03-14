import React, { useState } from 'react';
import { ChevronLeft, Loader2, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import Button from '../components/Button';
import FileDropzone from '../components/FileDropzone';
import { CONFIG } from '../config';

const ClioIntake = ({ navigate }) => {
    const [step, setStep] = useState('form'); // form, processing, success
    const [error, setError] = useState(null);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setError('Please upload an Invention Disclosure Form (IDF).');
            return;
        }

        if (!formData.name || !formData.email || !formData.phone) {
            setError('Please fill out all contact fields.');
            return;
        }

        setStep('processing');
        setError(null);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('form', file);

        try {
            const response = await fetch(CONFIG.endpoints.clioIntake, {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setStep('success');
        } catch (err) {
            console.error("ClioIntake Error:", err);
            setError("Submission failed. The secure webhook could not be reached or returned an error.");
            setStep('form');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            <Button variant="outline" onClick={() => navigate('home')} className="mb-8 border-none px-0 hover:bg-transparent justify-start">
                <ChevronLeft className="w-5 h-5" /> Back to Home
            </Button>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 min-h-[600px] flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-slate-800">IDF to Clio</h2>
                        <p className="text-sm text-slate-500">Secure File & Info Submission</p>
                    </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    {step === 'form' && (
                        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
                            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            placeholder="Jane Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            placeholder="jane@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            placeholder="(555) 123-4567"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-sm font-medium text-slate-700 mb-2">Invention Disclosure Form (IDF)</h3>
                                    {file ? (
                                        <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Upload className="w-5 h-5 text-amber-600" />
                                                <span className="text-sm font-medium text-amber-900">{file.name}</span>
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => setFile(null)}
                                                className="text-sm text-amber-600 hover:text-amber-800 font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <FileDropzone
                                            accept=".pdf,.docx,.doc"
                                            label="Upload IDF Document"
                                            icon={Upload}
                                            onFileSelect={setFile}
                                        />
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                                    <Button type="submit" className="w-full sm:w-auto px-8">
                                        Submit Intake Form
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-8 text-center text-xs text-slate-400">
                                <p>All submissions are encrypted and processed securely.</p>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-16 h-16 text-slate-800 animate-spin mb-6" />
                            <h3 className="text-2xl font-serif text-slate-800 mb-2">Submitting Information</h3>
                            <p className="text-slate-500">Securely uploading your details to Clio...</p>
                            <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
                                <div className="h-full bg-amber-500 animate-pulse rounded-full w-2/3"></div>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 flex flex-col justify-center items-center text-center">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-slate-800 mb-4">Submission Successful</h3>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 max-w-md">
                                <p className="text-slate-600 text-lg">
                                    Everything has been uploaded in Clio.
                                </p>
                            </div>
                            <p className="text-slate-500 mt-6 max-w-md">
                                Thank you for providing your information. Our team will review your submission shortly.
                            </p>
                            <Button 
                                onClick={() => { 
                                    setStep('form'); 
                                    setFormData({ name: '', email: '', phone: '' }); 
                                    setFile(null); 
                                    navigate('home');
                                }} 
                                className="mt-8 px-8"
                            >
                                Return to Dashboard
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClioIntake;
