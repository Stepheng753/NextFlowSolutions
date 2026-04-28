import React, { useState } from "react";
import { Users, Mail, ArrowLeft, Loader2, CheckCircle, Send, Info } from "lucide-react";

const UglowApp = () => {
    const [currentView, setCurrentView] = useState("home"); // 'home' | 'form' | 'success' | 'send'
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [formData, setFormData] = useState({ brand: "", product: "", instructions: "" });
    const [generatedCount, setGeneratedCount] = useState(null);
    const [isGeneratingPending, setIsGeneratingPending] = useState(false);
    const [emailsToSend, setEmailsToSend] = useState(5);
    const [sendNotification, setSendNotification] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const goToHome = () => {
        setGeneratedCount(null);
        setIsGeneratingPending(false);
        setSendNotification(false);
        setCurrentView("home");
    };

    const goToForm = () => {
        // Clear inputs when going to the form
        setFormData({ brand: "", product: "", instructions: "" });
        setGeneratedCount(null);
        setCurrentView("form");
    };

    const handleFindPeopleSubmit = async (e) => {
        e.preventDefault();
        setLoadingText("Finding Target Audience...");
        setIsLoading(true);
        setGeneratedCount(null);
        try {
            const response = await fetch("https://n8n.stepheng753.com/webhook/uglow/find-people", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setCurrentView("success");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error connecting to webhook.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateEmails = async () => {
        setLoadingText("Generating Emails...");
        setIsLoading(true);
        setGeneratedCount(null);
        setIsGeneratingPending(false);
        try {
            const response = await fetch("https://n8n.stepheng753.com/webhook/uglow/generate-emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (response.status === 202) {
                setIsGeneratingPending(true);
            } else if (response.ok) {
                const data = await response.json().catch(() => ({}));
                let count = 0;
                if (Array.isArray(data) && data.length > 0) {
                    count = data[0].number_emails || 0;
                } else if (data && typeof data === "object") {
                    count = data.number_emails || 0;
                }
                setGeneratedCount(count);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error generating emails:", error);
            alert("Error connecting to webhook.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendEmailsSubmit = async (e) => {
        e.preventDefault();
        const count = parseInt(emailsToSend, 10);
        if (isNaN(count) || count < 1 || count > 30) {
            alert("Please enter a valid number of emails to send (between 1 and 30).");
            return;
        }

        setLoadingText("Sending Emails...");
        setIsLoading(true);
        setSendNotification(false);
        try {
            const response = await fetch("https://n8n.stepheng753.com/webhook/uglow/send-emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ count }),
            });

            if (response.ok) {
                setSendNotification(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error sending emails:", error);
            alert("Error connecting to webhook.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/30 relative">
            {/* Full Page Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <h3 className="font-serif text-xl font-bold text-slate-800">{loadingText}</h3>
                        <p className="text-slate-500 mt-2 text-sm">Please wait for the workflow to complete...</p>
                    </div>
                </div>
            )}

            {/* Home View */}
            {currentView === "home" && (
                <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Bill Uglow - Turtle with a Boost 🐢🚀
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Select an option below to find your target audience or generate automated emails.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
                        {/* Card 1 */}
                        <div
                            onClick={goToForm}
                            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-10 h-10 text-blue-700" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Find People</h3>
                            <p className="text-slate-600 mb-6">Target your ideal audience and populate your list.</p>
                            <span className="text-blue-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                Get Started &rarr;
                            </span>
                        </div>

                        {/* Card 2 */}
                        <div
                            onClick={() => setCurrentView("success")}
                            className={`group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center`}
                        >
                            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Mail className="w-10 h-10 text-emerald-700" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Generate Emails</h3>
                            <p className="text-slate-600 mb-6">
                                Review your list and run the email generation workflow.
                            </p>
                            <span className="text-emerald-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                Go to Review &rarr;
                            </span>
                        </div>

                        {/* Card 3 */}
                        <div
                            onClick={() => setCurrentView("send")}
                            className={`group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center`}
                        >
                            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Send className="w-10 h-10 text-purple-700" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Send Emails</h3>
                            <p className="text-slate-600 mb-6">Specify the number of emails and send them out.</p>
                            <span className="text-purple-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                Configure & Send &rarr;
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Form View */}
            {currentView === "form" && (
                <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
                    <button
                        onClick={goToHome}
                        className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6 text-center">
                            Find Target Audience
                        </h2>
                        <form onSubmit={handleFindPeopleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-slate-700 mb-2">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-all"
                                    placeholder="Enter brand name"
                                />
                            </div>
                            <div>
                                <label htmlFor="product" className="block text-sm font-medium text-slate-700 mb-2">
                                    Product
                                </label>
                                <input
                                    type="text"
                                    id="product"
                                    name="product"
                                    value={formData.product}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-all"
                                    placeholder="Enter product details"
                                />
                            </div>
                            <div>
                                <label htmlFor="instructions" className="block text-sm font-medium text-slate-700 mb-2">
                                    Additional Instructions
                                </label>
                                <textarea
                                    id="instructions"
                                    name="instructions"
                                    value={formData.instructions}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-all"
                                    placeholder="Any extra instructions..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                                    isLoading
                                        ? "bg-blue-500 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Finding Audience...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Success View */}
            {currentView === "success" && (
                <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
                    <button
                        onClick={goToHome}
                        className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6 text-center">
                            Review Target Audience
                        </h2>

                        {isGeneratingPending && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
                                <Info className="w-6 h-6 text-blue-600" />
                                <h3 className="text-lg text-blue-800 font-medium">
                                    Please come back in a few minutes as there are a lot of emails to generate.
                                </h3>
                            </div>
                        )}

                        {generatedCount !== null && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                                <h3 className="text-lg text-emerald-800 font-medium">
                                    {generatedCount} emails have been generated and added to the sheet!
                                </h3>
                            </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                            <CheckCircle className="w-6 h-6 text-blue-600" />
                            <h3 className="text-lg text-slate-800">
                                <span className="font-semibold text-blue-800">Click Here for Full Review:</span>{" "}
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY/edit?gid=0#gid=0"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Email Automater
                                </a>
                            </h3>
                        </div>

                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-2 mb-8 h-[600px] relative overflow-hidden flex items-center justify-center">
                            {/* Sheet Preview / Fallback */}
                            <iframe
                                src="https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY/edit?gid=0#gid=0&rm=minimal"
                                className="w-full h-full border-0 rounded-lg absolute inset-0 z-10"
                                title="Google Sheet Preview"
                            />
                            {/* Fallback in case iframe fails */}
                            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg">
                                <div className="grid grid-cols-4 w-full px-8 gap-4 opacity-50 mb-4">
                                    <div className="h-6 bg-slate-200 rounded"></div>
                                    <div className="h-6 bg-slate-200 rounded"></div>
                                    <div className="h-6 bg-slate-200 rounded"></div>
                                    <div className="h-6 bg-slate-200 rounded"></div>
                                </div>
                                <p>Sheet Preview Blocked? Click the link above to view directly.</p>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateEmails}
                            disabled={isLoading}
                            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                                isLoading
                                    ? "bg-blue-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Emails"
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Send View */}
            {currentView === "send" && (
                <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
                    <button
                        onClick={goToHome}
                        className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6 text-center">Send Emails</h2>

                        {sendNotification && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                                <h3 className="text-lg text-emerald-800 font-medium">
                                    Emails have been successfully sent!
                                </h3>
                            </div>
                        )}

                        <form onSubmit={handleSendEmailsSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="emailsToSend" className="block text-sm font-medium text-slate-700 mb-2">
                                    Number of Emails to Send (Max 30)
                                </label>
                                <input
                                    type="number"
                                    id="emailsToSend"
                                    name="emailsToSend"
                                    min="1"
                                    max="30"
                                    value={emailsToSend}
                                    onChange={(e) => setEmailsToSend(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black transition-all"
                                    placeholder="Enter a number between 1 and 30"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                                    isLoading
                                        ? "bg-purple-500 cursor-not-allowed"
                                        : "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Sending Emails...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" /> Send Emails
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UglowApp;
