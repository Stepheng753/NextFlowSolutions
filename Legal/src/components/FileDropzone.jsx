import React, { useState, useRef } from 'react';

const FileDropzone = ({ onFileSelect, accept, label, icon: Icon }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <div
            className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer
        ${isDragging ? 'border-amber-500 bg-amber-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Click to upload or drag and drop</h3>
                    <p className="text-sm text-slate-500 mt-1">{label}</p>
                </div>
            </div>
        </div>
    );
};

export default FileDropzone;
