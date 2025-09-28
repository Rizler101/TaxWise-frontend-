import React, { useState, useCallback } from "react";
import { UploadCloud, X, FileText } from "lucide-react";
import { useFiles } from "../components/FileContext"; // ⬅️ Import global context
import { useNavigate } from "react-router-dom";

// ====================================================================
// ONE UI Style Helper Components
// ====================================================================
const OneUiButton = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 font-semibold text-white rounded-xl shadow-md transition-all duration-200
      bg-blue-600 hover:bg-blue-700 active:bg-blue-800
      ${className}
    `}
  >
    {children}
  </button>
);

const OneUiCard = ({ children }) => (
  <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
    {children}
  </div>
);

// ====================================================================
// Main Upload Component
// ====================================================================
export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { addFiles } = useFiles(); // ⬅️ from context
  const navigate = useNavigate();

  const handleFileDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const newFiles = Array.from(event.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    },
    []
  );

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const finalizeUpload = () => {
    if (files.length > 0) {
      addFiles(files); // ⬅️ Save globally
      setFiles([]);
      navigate("/dashboard"); // ⬅️ Redirect to dashboard
    } else {
      alert("Please select files before uploading.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* --- One UI Top Header Section (Large and Bold) --- */}
      <div className="w-full max-w-4xl pt-10 pb-4 px-6 sm:px-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
          File Uploader
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Manage your documents, photos, and videos.
        </p>
      </div>

      <div className="w-full p-6 sm:p-8">
        <OneUiCard>
          {/* --- Drop Zone / Input --- */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`
              flex flex-col items-center justify-center h-56 text-center cursor-pointer p-6 transition-all duration-300
              border-2 border-dashed rounded-xl
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 bg-white"
              }
            `}
          >
            <UploadCloud
              className={`w-12 h-12 ${
                isDragging ? "text-blue-600" : "text-gray-400"
              }`}
            />

            <p
              className={`mt-4 text-lg font-semibold ${
                isDragging ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Drag & Drop files here
            </p>
            <p className="mt-1 text-sm text-gray-500">
              or click the button below to select manually
            </p>

            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="mt-4">
              <OneUiButton
                onClick={() => document.getElementById("file-upload").click()}
                className="py-2 px-5 text-sm"
              >
                Browse Files
              </OneUiButton>
            </label>
          </div>

          {/* --- File List --- */}
          {files.length > 0 && (
            <div className="mt-8 space-y-3">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                {files.length} Files Ready to Upload
              </h2>
              <div className="max-h-60 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="truncate text-gray-700 font-medium">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <span className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove file"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Final Upload Button --- */}
          {files.length > 0 && (
            <div className="mt-8 flex justify-end">
              <OneUiButton onClick={finalizeUpload}>Finalize Upload</OneUiButton>
            </div>
          )}
        </OneUiCard>
      </div>
    </div>
  );
}
