import React from 'react';
import { useFiles } from "../components/FileContext"; // ⬅️ import context

// Icons
const CheckCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);
const TrendingUp = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const TrendingDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);
const FileUp = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M12 11v6" />
    <path d="m15 14-3-3-3 3" />
  </svg>
);
const Building = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4" />
    <path d="M15 22v-4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 6h4" />
  </svg>
);

// Card Header
const CardHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
    <Icon className="w-5 h-5 text-blue-500 mr-2" />
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
  </div>
);

// Dashboard
const Dashboard = () => {
  const { files } = useFiles(); // ⬅️ get uploaded files

  // Calculate dummy totals based on files
  const totalIncome = files.length * 1000; // e.g. ₹1000 per file
  const totalExpenses = files.length * 500; // e.g. ₹500 per file

  return (
    <div className="min-h-full pb-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
          Welcome Back!
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Here's your financial snapshot for today.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Financial Overview */}
          <div className="bg-white p-6 rounded-2xl shadow-md min-h-80">
            <CardHeader title="Financial Overview" icon={CheckCircle} />

            {/* Summary Metrics */}
            <div className="flex justify-center gap-12 mb-6">
              <div className="flex flex-col items-center">
                <p className="flex items-center text-green-600 font-semibold text-sm mb-1">
                  <TrendingUp className="w-4 h-4 mr-1" />Total Income
                </p>
                <span className="text-3xl font-bold text-green-600">₹{totalIncome}</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="flex items-center text-red-600 font-semibold text-sm mb-1">
                  <TrendingDown className="w-4 h-4 mr-1" />Total Expenses
                </p>
                <span className="text-3xl font-bold text-red-600">₹{totalExpenses}</span>
              </div>
            </div>

            {/* Show files or placeholder */}
            {files.length === 0 ? (
              <p className="text-gray-500 text-center">No files uploaded yet.</p>
            ) : (
              <div className="max-h-40 overflow-y-auto">
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {files.map((f, idx) => (
                    <li key={idx}>
                      {f.name} <span className="text-sm text-gray-500">({f.size})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tax Status */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <CardHeader title="Tax Status" icon={CheckCircle} />
            <div className="text-center py-4">
              {files.length === 0 ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Filing Status: Not Started</h3>
                  <p className="text-gray-500 text-sm">You haven't uploaded documents for this year yet.</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Filing In Progress</h3>
                  <p className="text-gray-500 text-sm">{files.length} document(s) uploaded.</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* CIBIL Health */}
          <div className="bg-white p-6 rounded-2xl shadow-md min-h-64">
            <CardHeader title="CIBIL Health" icon={CheckCircle} />
            <div className="text-center pt-2 pb-4">
              <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Check your CIBIL score</h3>
              <p className="text-sm text-gray-500 mb-4">Get personalized tips to improve your credit health.</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition shadow-md">
                Analyze Score
              </button>
            </div>
          </div>

          {/* Action Center */}
          <div className="bg-white p-6 rounded-2xl shadow-md min-h-64">
            <CardHeader title="Action Center" icon={CheckCircle} />
            <div className="text-center pt-2 pb-4">
              <FileUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Upload your statements</h3>
              <p className="text-sm text-gray-500 mb-4">Start your tax optimization process today.</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition shadow-md">
                Go to Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
