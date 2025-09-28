import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ScoreGauge from "./components/ScoreGauge";

export default function App() {
  const [metrics, setMetrics] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">TaxWise — CIBIL Advisor</h1>
      <UploadForm onResult={setMetrics} />
      {metrics && (
        <div className="mt-10 space-y-4">
          <ScoreGauge score={metrics.score} />
          <div className="text-left mx-auto max-w-sm bg-gray-50 rounded-xl p-4 shadow">
            <p><strong>Late payments:</strong> {metrics.late_payments}</p>
            <p><strong>Credit utilization:</strong> {metrics.credit_utilization_percent}%</p>
            <p><strong>Distinct accounts:</strong> {metrics.new_accounts_last_year}</p>
          </div>
        </div>
      )}
    </div>
  );
}
