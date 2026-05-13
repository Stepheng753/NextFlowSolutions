import React, { useState } from "react";
import { Users, Mail, ArrowLeft, Loader2, CheckCircle, Send, Info } from "lucide-react";

const UglowApp = () => {
    const [currentView, setCurrentView] = useState("home"); // 'home' | 'form' | 'success' | 'send'
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [formData, setFormData] = useState({ brand: "", product: "", instructions: "", companies: "" });
    const [emailsToSend, setEmailsToSend] = useState(5);
    const [sendNotification, setSendNotification] = useState(false);
    const [formType, setFormType] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const goToHome = () => {
        setSendNotification(false);
        setCurrentView("home");
    };

    const goToForm = (type) => {
        // Clear inputs when going to the form
        setFormData({ brand: "", product: "", instructions: "", companies: "" });
        setFormType("");
        setCurrentView("form");
    };

    const handleFindPeopleSubmit = async (e) => {
        e.preventDefault();
        setLoadingText(formType === "companies" ? "Finding Audience from Companies..." : "Finding Target Audience...");
        setIsLoading(true);
        const url =
            formType === "companies"
                ? "https://n8n.stepheng753.com/webhook/uglow/find-people-from-companies"
                : "https://n8n.stepheng753.com/webhook/uglow/find-people";

        let payload = { ...formData };
        if (formType === "companies") {
            const parsedCompanies = formData.companies
                .split(/[\n,;]+/)
                .map((c) => c.trim())
                .filter((c) => c.length > 0)
                .join(", ");
            payload.companies = parsedCompanies;
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
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
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Bill Uglow - Turtle Turned Hare 🐢→🐇
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Follow the instructions below to find contacts, review drafts, and send automated emails.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12 text-left max-w-4xl mx-auto">
                        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-3">
                            <Info className="w-6 h-6 text-blue-600" />
                            How to Use This System
                        </h3>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                                    1
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-2">
                                        Find Contacts & Draft Emails
                                    </h4>
                                    <p className="text-slate-600 text-lg">
                                        Click <strong>Find People</strong> below. Select your search method (Product Search or Paste Companies). Fill out the form with your Brand, Product/Companies, and Instructions, then click Submit. The system will find contacts and draft emails for you automatically.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
                                    2
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-2">Review Your List</h4>
                                    <p className="text-slate-600 text-lg">
                                        After submitting, you will see a page to review your Google Sheet. Open the sheet here: <br />
                                        <a
                                            href="https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 font-bold hover:underline break-all text-base"
                                        >
                                            https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY
                                        </a>
                                        <br />
                                        and review your list of contacts and drafted emails. <br />
                                        <br />• If you want to email them: Type <strong>Ready</strong> (ensure you use a
                                        capital "R") in the "Ready to Send" column.
                                        <br />
                                        • To edit a subject line: Click the box once and type your new subject.
                                        <br />• To edit a message: Double-click the box to view the full text and make
                                        any changes.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-lg">
                                    3
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-2">Send the Emails</h4>
                                    <p className="text-slate-600 text-lg">
                                        Return to this main page and click <strong>Send Emails</strong>. Enter the
                                        maximum number of emails you want to send at this time. For example, if you
                                        enter "2", it will send the first 2 emails marked "Ready".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
                        {/* Card 1 */}
                        <div
                            onClick={() => goToForm("people")}
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

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                        <h3 className="font-serif text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-600" />
                            Instructions
                        </h3>
                        <div className="text-slate-600 mb-4">
                            <p className="font-semibold mb-1">1. Fill out the form:</p>
                            <ul className="list-disc list-outside ml-6 space-y-1 mb-2">
                                <li>Enter your <strong>Brand</strong> name.</li>
                                <li>Select a <strong>Search Method</strong> from the dropdown.</li>
                                <li>If you chose <em>Product Search</em>, enter the product or service you are promoting.</li>
                                <li>If you chose <em>Paste Companies</em>, paste a list of 50-100 target companies (separated by commas, semicolons, or newlines).</li>
                                <li>Add any <strong>Additional Instructions</strong> to help guide the email drafting process.</li>
                            </ul>
                            <p className="ml-6">Click <strong>Submit</strong> to start the workflow.</p>
                        </div>
                        <p className="text-slate-600 mb-2">
                            2. Wait for the success page, then review your results here: <br />
                            <a
                                href="https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 font-bold hover:underline"
                            >
                                https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY
                            </a>
                        </p>
                        <p className="text-slate-600">
                            3. Type <strong>Ready</strong> in the "Ready to Send" column for any contact you wish to
                            email.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6 text-center">
                            {formType === "companies" ? "Find Audience from Companies" : "Find Target Audience"}
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
                                <label htmlFor="searchMethod" className="block text-sm font-medium text-slate-700 mb-2">
                                    Search Method
                                </label>
                                <select
                                    id="searchMethod"
                                    value={formType}
                                    onChange={(e) => setFormType(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-all bg-white"
                                >
                                    <option value="" disabled>Select a search method</option>
                                    <option value="people">Product Search</option>
                                    <option value="companies">Paste Companies</option>
                                </select>
                            </div>
                            {formType === "people" && (
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
                            )}
                            {formType === "companies" && (
                                <div>
                                    <label
                                        htmlFor="companies"
                                        className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                        Companies to Search
                                    </label>
                                    <textarea
                                        id="companies"
                                        name="companies"
                                        value={formData.companies}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-all"
                                        placeholder="Paste 50-100 companies separated by commas, newlines, or semicolons"
                                    ></textarea>
                                </div>
                            )}
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
                                        ? formType === "companies"
                                            ? "bg-cyan-600 cursor-not-allowed"
                                            : "bg-blue-500 cursor-not-allowed"
                                        : formType === "companies"
                                          ? "bg-cyan-700 hover:bg-cyan-800 shadow-md hover:shadow-lg"
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
                            Success! Your Audience is Ready for Review
                        </h2>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-center flex flex-col items-center justify-center gap-4">
                            <CheckCircle className="w-12 h-12 text-blue-600" />
                            <h3 className="text-xl text-slate-800 max-w-2xl">
                                We've found the contacts and drafted the emails for you. Please click the link below to
                                review them in your Google Sheet.
                            </h3>
                            <h3 className="text-2xl text-slate-800 mt-2">
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY/edit?gid=0#gid=0"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    &rarr; Click Here to Review the Google Sheet &larr;
                                </a>
                            </h3>
                        </div>
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

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                        <h3 className="font-serif text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-purple-600" />
                            Instructions
                        </h3>
                        <p className="text-slate-600 mb-2">
                            1. Ensure you have reviewed your Google Sheet and marked contacts as <strong>Ready</strong>:
                            <br />
                            <a
                                href="https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY"
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-600 font-bold hover:underline break-all"
                            >
                                https://docs.google.com/spreadsheets/d/1-vev5vgvRcMkB8CohCWrUDWA8OE8--EbyJ8rGwoKAmY
                            </a>
                        </p>
                        <p className="text-slate-600">
                            2. Enter the maximum number of emails you want to send below and click{" "}
                            <strong>Send Emails</strong>.
                        </p>
                    </div>

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
