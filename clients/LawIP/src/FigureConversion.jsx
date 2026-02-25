import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronLeft, Loader2, AlertCircle, FileImage, Download } from 'lucide-react';
import Button from './components/Button';
import FileDropzone from './components/FileDropzone';
import { CONFIG } from './config';

const FigureConversion = ({ navigate }) => {
    const [step, setStep] = useState('upload'); // upload, processing, review, feedback
    const [file, setFile] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [feedbackReason, setFeedbackReason] = useState('');
    const [error, setError] = useState(null);

    // Create a preview URL for the uploaded file
    const [previewUrl, setPreviewUrl] = useState(null);

    React.useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Free memory when component unmounts or file changes
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    // Mock API Call - Replace logic with actual axios/fetch in production
    const uploadImage = async (selectedFile) => {
        setFile(selectedFile);
        setStep('processing');
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch(CONFIG.endpoints.conversion, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error("Conversion failed");

            const data = await res.json();
            // n8n returns an array of items
            const result = Array.isArray(data) ? data[0] : data;

            if (!result.imageUrl) {
                console.error("Missing imageUrl in response:", data);
                throw new Error("Invalid response format: missing imageUrl");
            }

            setResultImage(result.imageUrl);
            setPrompt(result.prompt);
            setStep('review');
        } catch (err) {
            console.error(err);
            setError("Workflow connection failed. Please try again.");
            setStep('upload');
        }
    };

    const submitFeedback = async (approved) => {
        if (approved) {
            setStep('success');
            return;
        }

        setStep('processing');

        try {
            const formData = new FormData();
            formData.append('status', approved ? 'Approved' : 'Rejected');
            formData.append('feedback', approved ? 'No feedback provided' : feedbackReason);
            formData.append('timestamp', new Date().toISOString());
            formData.append('prompt', prompt);

            if (file) {
                formData.append('originalImage', file);
            }

            if (resultImage) {
                // Convert the blob URL back to a blob to send it
                const imageResponse = await fetch(resultImage);
                const imageBlob = await imageResponse.blob();
                formData.append('rejectedImage', imageBlob, 'generated_result.png');
            }

            const res = await fetch(CONFIG.endpoints.feedback, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error("Feedback submission failed");

            if (approved) {
                setStep('success');
            } else {
                // If rejected, we expect a new image back
                const data = await res.json();
                const result = Array.isArray(data) ? data[0] : data;

                setResultImage(result.imageUrl);
                setPrompt(result.prompt);
                setFeedbackReason(''); // Clear feedback for next round
                setStep('review');
            }
        } catch (err) {
            setError("Failed to submit feedback. " + err.message);
            setStep('review');
        }
    };

    const downloadImage = () => {
        if (!resultImage) return;

        const link = document.createElement('a');
        link.href = resultImage;
        link.download = `converted-figure-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            <Button variant="outline" onClick={() => navigate('home')} className="mb-8 border-none px-0 hover:bg-transparent justify-start">
                <ChevronLeft className="w-5 h-5" /> Back to Dashboard
            </Button>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-slate-800">Figure Conversion</h2>
                        <p className="text-sm text-slate-500">Transform sketches into compliant patent figures</p>
                    </div>
                    {step !== 'upload' && step !== 'success' && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 uppercase tracking-wide">
                            {step === 'processing' ? 'Processing' : 'Review Required'}
                        </span>
                    )}
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    {step === 'upload' && (
                        <FileDropzone
                            accept="image/*"
                            label="SVG, PNG, JPG accepted (Max 10MB)"
                            icon={FileImage}
                            onFileSelect={uploadImage}
                        />
                    )}

                    {step === 'processing' && (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
                            <h3 className="text-xl font-medium text-slate-800">AI Processing Active</h3>
                            <p className="text-slate-500 max-w-md mt-2">Connecting to n8n workflow. Analyzing image structure and generating vector-compliant output...</p>
                        </div>
                    )}

                    {step === 'review' && resultImage && (
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-slate-700 mb-3">Original Upload</h4>
                                    <div className="w-[375px] h-[375px] bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden relative">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Original Upload"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-slate-400 text-sm">{file?.name}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> AI Generated Result
                                    </h4>
                                    <div className="w-[375px] h-[375px] bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden relative">
                                        <img src={resultImage} alt="Generated" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h4 className="font-serif font-bold text-slate-800 mb-4">Quality Assurance</h4>
                                {feedbackReason !== '' || document.activeElement?.name === 'reason' ? (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Disapproval</label>
                                        <textarea
                                            name="reason"
                                            value={feedbackReason}
                                            onChange={(e) => setFeedbackReason(e.target.value)}
                                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-32"
                                            placeholder="e.g., Lines are too faint, numerals are missing..."
                                        />
                                        <div className="flex gap-4 mt-4 justify-end">
                                            <Button variant="outline" onClick={() => setFeedbackReason('')}>Cancel</Button>
                                            <Button variant="danger" onClick={() => submitFeedback(false)}>Submit Feedback</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                                        <Button variant="success" className="w-full md:w-auto" onClick={() => submitFeedback(true)}>
                                            <CheckCircle className="w-5 h-5" /> Approve Figure
                                        </Button>
                                        <Button variant="danger" className="w-full md:w-auto" onClick={() => setFeedbackReason(' ')}>
                                            <XCircle className="w-5 h-5" /> Disapprove
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Workflow Complete</h3>
                            <p className="text-slate-600 mb-8">Your feedback has been recorded and the final assets have been routed to the client folder.</p>

                            {resultImage && (
                                <div className="mb-8 max-w-lg mx-auto">
                                    <img
                                        src={resultImage}
                                        alt="Final Generated Figure"
                                        className="rounded-lg shadow-md border border-slate-200 w-full"
                                    />
                                </div>
                            )}

                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={() => { setStep('upload'); setFile(null); setResultImage(null); setFeedbackReason(''); }}>
                                    Process Another Figure
                                </Button>
                                <Button onClick={downloadImage} className="flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Download Figure
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FigureConversion;
