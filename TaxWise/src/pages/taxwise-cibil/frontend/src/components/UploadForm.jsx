import React, { useState } from "react";
import { API_BASE, uploadCSV } from "../api";

export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return alert("Please choose a CSV file first.");
    setLoading(true);
    try {
      const data = await uploadCSV(file);
      if (data?.status === "ok") {
        onResult(data.metrics);
      } else {
        alert("Server error: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. See console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded max-w-md mx-auto">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-700 border rounded p-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>
    </form>
  );
}
