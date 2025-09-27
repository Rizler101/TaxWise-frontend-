import React from 'react';

// Icons using inline SVG for a clean look (replacing the emojis)
const CheckCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
const TrendingUp = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const TrendingDown = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-down"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
);
const FileUp = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 11v6"/><path d="m15 14-3-3-3 3"/></svg>
);
const Building = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4"/><path d="M15 22v-4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 6h4"/></svg>
);

// Component for Card Header with Icon and Title
const CardHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
        <Icon className="w-5 h-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
);

// Component for the Icon with "No Data Yet" Message
const NoDataPlaceholder = () => (
    <div className="flex flex-col items-center justify-center text-center py-10">
        <svg className="w-16 h-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
        </svg>
        <p className="text-gray-500 font-semibold mb-1">No Data Yet</p>
        <p className="text-sm text-gray-400">Upload your financial data to see insights here!</p>
    </div>
);

/**
 * Main Dashboard Component
 */
const Dashboard = () => {
    // Note: The 'bg-link-active' custom color is not defined here, 
    // it's expected to be defined in App.jsx's tailwind config for the blue accent.

    return (
        <div className="min-h-full pb-10">
            
            {/* 1. Large Header (Matches Image) */}
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
                    Welcome Back!
                </h1>
                <p className="text-gray-500 text-lg font-medium">Here's your financial snapshot for today.</p>
            </header>

            {/* 2. Main Grid Layout (2-column layout for desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Financial Overview (Large Card) & Tax Status (Small Card) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* Financial Overview Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-md min-h-80">
                        <CardHeader title="Financial Overview" icon={CheckCircle} />
                        
                        {/* Summary Metrics */}
                        <div className="flex justify-center gap-12 mb-6">
                            <div className="flex flex-col items-center">
                                <p className="flex items-center text-green-600 font-semibold text-sm mb-1">
                                    <TrendingUp className="w-4 h-4 mr-1"/>Total Income
                                </p>
                                <span className="text-3xl font-bold text-green-600">₹0</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex items-center text-red-600 font-semibold text-sm mb-1">
                                    <TrendingDown className="w-4 h-4 mr-1"/>Total Expenses
                                </p>
                                <span className="text-3xl font-bold text-red-600">₹0</span>
                            </div>
                        </div>

                        {/* Chart/Data Placeholder */}
                        <NoDataPlaceholder />
                    </div>

                    {/* Tax Status Card (Bottom Left) */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <CardHeader title="Tax Status" icon={CheckCircle} />
                        <div className="text-center py-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Filing Status: Not Started</h3>
                            <p className="text-gray-500 text-sm">You haven't uploaded documents for the current financial year yet.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: CIBIL Health & Action Center */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    
                    {/* CIBIL Health Card (Top Right) */}
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

                    {/* Action Center Card (Bottom Right) */}
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
