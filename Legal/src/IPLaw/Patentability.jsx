import React, { useState } from 'react';
import { ChevronLeft, Loader2, AlertCircle, FileText, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import Button from '../components/Button';
import FileDropzone from '../components/FileDropzone';
import { CONFIG } from '../config';

const PatentabilityAnalysis = ({ navigate }) => {
    const [step, setStep] = useState('upload');
    const [htmlReport, setHtmlReport] = useState('');
    const [error, setError] = useState(null);

    const handleUpload = async (file) => {
        setStep('processing');
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(CONFIG.endpoints.patent, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const htmlContent = await response.text();
            setHtmlReport(htmlContent);
            setStep('results');
        } catch (err) {
            setError("Analysis failed. The webhook could not be reached.");
            setStep('upload');
        }
    };

    const handleExportPdf = () => {
        const iframe = document.getElementById('report-iframe');
        if (!iframe) return;
        const element = iframe.contentWindow.document.body;

        const opt = {
            margin: 1,
            filename: 'patentability-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            <Button variant="outline" onClick={() => navigate('ip-law')} className="mb-8 border-none px-0 hover:bg-transparent justify-start">
                <ChevronLeft className="w-5 h-5" /> Back to IP Law
            </Button>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 min-h-[600px] flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-slate-800">Patentability Analysis</h2>
                        <p className="text-sm text-slate-500">Invention Disclosure Form (IDF) Assessment</p>
                    </div>
                </div>

                <div className="p-8 flex-1">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    {step === 'upload' && (
                        <div className="h-full flex flex-col justify-center">
                            <FileDropzone
                                accept=".pdf,.docx"
                                label="Upload IDF (PDF/DOCX) - Confidential"
                                icon={FileText}
                                onFileSelect={handleUpload}
                            />
                            <div className="mt-8 text-center text-xs text-slate-400">
                                <p>All uploads are encrypted and processed via SOC2 compliant servers.</p>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-16 h-16 text-slate-800 animate-spin mb-6" />
                            <h3 className="text-2xl font-serif text-slate-800 mb-2">Analyzing Claims</h3>
                            <p className="text-slate-500">Cross-referencing USPTO & WIPO databases...</p>
                            <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
                                <div className="h-full bg-amber-500 animate-pulse rounded-full w-2/3"></div>
                            </div>
                        </div>
                    )}

                    {step === 'results' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex justify-end mb-4">
                                <Button onClick={handleExportPdf} variant="outline" className="text-sm py-1 flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Export PDF
                                </Button>
                                <Button onClick={() => setStep('upload')} variant="primary" className="ml-2 text-sm py-1">New Analysis</Button>
                            </div>

                            {/* Report Container - Simulating Paper Look */}
                            <div className="bg-white border border-slate-200 shadow-sm mx-auto max-w-3xl overflow-hidden min-h-[800px]">
                                <iframe
                                    id="report-iframe"
                                    title="Patentability Report"
                                    className="w-full border-none pointer-events-auto"
                                    style={{ minHeight: '800px' }}
                                    srcDoc={htmlReport}
                                    onLoad={(e) => {
                                        const iframe = e.target;
                                        try {
                                            const doc = iframe.contentDocument || iframe.contentWindow.document;
                                            doc.body.style.margin = '0';
                                            doc.body.style.padding = '32px';
                                            // Dynamically resize iframe to fit the content
                                            iframe.style.height = doc.documentElement.scrollHeight + 'px';
                                        } catch (err) { }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatentabilityAnalysis;
