import React, { useState } from 'react';
import { ChevronLeft, Loader2, AlertCircle, FileText, CheckCircle, Download } from 'lucide-react';
import Button from '../components/Button';
import FileDropzone from '../components/FileDropzone';
import { CONFIG } from '../config';
import Papa from 'papaparse';

const ReconciliateBills = ({ navigate }) => {
    const [step, setStep] = useState('upload'); // upload, processing, results
    const [error, setError] = useState(null);
    const [csvContent, setCsvContent] = useState(null);
    const [tableData, setTableData] = useState({ headers: [], rows: [] });

    const handleUpload = async (file) => {
        setStep('processing');
        setError(null);
        setCsvContent(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(CONFIG.endpoints.reconciliateBills, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Expected response is CSV text
            const textResponse = await response.text();
            setCsvContent(textResponse);

            // Parse CSV for table display
            Papa.parse(textResponse, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.data.length > 0) {
                        setTableData({
                            headers: Object.keys(results.data[0]),
                            rows: results.data
                        });
                    }
                }
            });

            setStep('results');
        } catch (err) {
            console.error("ReconciliateBills Error:", err);
            setError("Analysis failed. The webhook could not be reached or returned an error.");
            setStep('upload');
        }
    };

    const handleDownloadCsv = () => {
        if (!csvContent) return;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reconciliated_bills.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            <Button variant="outline" onClick={() => navigate('pi-law')} className="mb-8 border-none px-0 hover:bg-transparent justify-start">
                <ChevronLeft className="w-5 h-5" /> Back to PI Law
            </Button>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 min-h-[600px] flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-slate-800">Reconciliate Bills</h2>
                        <p className="text-sm text-slate-500">Automated Medical Bill Processing to CSV</p>
                    </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    {step === 'upload' && (
                        <div className="flex-1 flex flex-col justify-center">
                            <FileDropzone
                                accept=".pdf,.docx"
                                label="Upload Medical Bills (PDF/DOCX) - Confidential"
                                icon={FileText}
                                onFileSelect={handleUpload}
                            />
                            <div className="mt-8 text-center text-xs text-slate-400">
                                <p>All uploads are encrypted and processed via SOC2 compliant servers.</p>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-16 h-16 text-slate-800 animate-spin mb-6" />
                            <h3 className="text-2xl font-serif text-slate-800 mb-2">Processing Bills</h3>
                            <p className="text-slate-500">Extracting and reconciling data...</p>
                            <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
                                <div className="h-full bg-amber-500 animate-pulse rounded-full w-2/3"></div>
                            </div>
                        </div>
                    )}

                    {step === 'results' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 flex flex-col">

                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Reconciliation Complete</h3>
                                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                    The medical bills have been successfully processed and structured into a CSV format.
                                </p>

                                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm mx-auto mb-8">
                                    <Button onClick={handleDownloadCsv} className="flex items-center justify-center gap-2 w-full">
                                        <Download className="w-5 h-5" /> Download CSV
                                    </Button>
                                    <Button variant="outline" onClick={() => { setStep('upload'); setCsvContent(null); setTableData({ headers: [], rows: [] }); }} className="w-full justify-center">
                                        Process Another
                                    </Button>
                                </div>
                            </div>

                            {tableData.headers.length > 0 && (
                                <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                    <div className="overflow-x-auto max-h-[400px]">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-600 uppercase bg-slate-50 sticky top-0 shadow-sm z-10">
                                                <tr>
                                                    {tableData.headers.map((header, idx) => (
                                                        <th key={idx} scope="col" className="px-6 py-3 font-semibold whitespace-nowrap">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                {tableData.rows.map((row, rowIdx) => (
                                                    <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                                                        {tableData.headers.map((header, colIdx) => (
                                                            <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-slate-700">
                                                                {row[header]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReconciliateBills;
