import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Zap,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

const CIBILAdvisorPage = () => {
  // Mock State for CIBIL Score and Status
  const [cibilScore, setCibilScore] = useState(765);
  const [isLoading, setIsLoading] = useState(false);

  // Determine health based on score
  const scoreHealth =
    cibilScore >= 750 ? 'Excellent' : cibilScore >= 650 ? 'Good' : 'Needs Improvement';

  const scoreColor =
    cibilScore >= 750 ? 'text-green-600' : cibilScore >= 650 ? 'text-yellow-600' : 'text-red-600';

  const scoreRingColor =
    cibilScore >= 750 ? 'border-green-400' : cibilScore >= 650 ? 'border-yellow-400' : 'border-red-400';

  // Mock recommendations based on score
  const recommendations = [
    { text: 'Maintain low credit utilization (below 30%)', status: 'High Impact', icon: Zap, color: 'text-indigo-500' },
    { text: 'Pay all EMIs and credit card bills on time', status: 'Critical', icon: CheckCircle, color: 'text-green-500' },
    { text: 'Avoid applying for multiple loans simultaneously', status: 'Moderate Impact', icon: AlertTriangle, color: 'text-yellow-500' },
    { text: 'Review your credit report annually for errors', status: 'Low Impact', icon: Lightbulb, color: 'text-blue-500' },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock score update (e.g., fetch new score)
      const newScore = Math.floor(Math.random() * (850 - 600 + 1)) + 600;
      setCibilScore(newScore);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          CIBIL Advisor
        </h2>
        <p className="text-gray-500 mt-1">
          Monitor your credit health and get personalized improvement strategies.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CIBIL Score Card (Span 1) */}
        <div className="lg:col-span-1 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <CreditCard className="w-6 h-6 text-indigo-500 mr-2" />
            Your Credit Score
          </h3>

          {/* Score Gauge Visualization */}
          <div className={`relative w-40 h-40 flex items-center justify-center rounded-full border-8 ${scoreRingColor} bg-gray-50 mb-4`}>
            <div className="absolute inset-0 m-2 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
              <span className={`text-4xl font-extrabold ${scoreColor}`}>
                {isLoading ? '...' : cibilScore}
              </span>
              <span className="text-sm text-gray-500">of 900</span>
            </div>
          </div>
          <p className={`text-lg font-bold ${scoreColor} mb-1`}>{scoreHealth} Health</p>
          <p className="text-sm text-gray-500 mb-6">Last checked: {new Date().toLocaleDateString()}</p>

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`px-6 py-2 flex items-center justify-center font-medium rounded-lg transition-colors duration-200 shadow-md ${
              isLoading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Score
              </>
            )}
          </button>
        </div>

        {/* Recommendations and Factors (Span 2) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Key Factors Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              Key Score Factors
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">Payment History</p>
                <p className="text-green-600">Excellent (100% On-time)</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">Credit Utilization</p>
                <p className="text-yellow-600">Good (35% Used)</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">Credit Age</p>
                <p className="text-green-600">Great (8 years avg.)</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">Hard Inquiries</p>
                <p className="text-red-600">High (4 in last 6 months)</p>
              </div>
            </div>
          </div>

          {/* Personalized Tips Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              Personalized Improvement Tips
            </h3>
            <ul className="space-y-3">
              {recommendations.map((tip, index) => {
                const TipIcon = tip.icon;
                return (
                  <li key={index} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <TipIcon className={`w-5 h-5 mt-1 mr-3 flex-shrink-0 ${tip.color}`} />
                    <div>
                      <p className="font-medium text-blue-800">{tip.text}</p>
                      <p className="text-xs text-blue-600 font-semibold">{tip.status}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CIBILAdvisorPage;
