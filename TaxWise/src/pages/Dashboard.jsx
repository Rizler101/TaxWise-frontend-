import React, { useState } from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  Sliders,
  ShieldCheck,
  FileText,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Building,
  Upload,
  Briefcase, // Using Briefcase instead of 'T' to fix the import error
} from 'lucide-react';

// --- Icon and Navigation Data ---

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Upload Center', icon: UploadCloud },
  { name: 'Tax Optimizer', icon: Sliders },
  { name: 'CIBIL Advisor', icon: ShieldCheck },
  { name: 'Reports', icon: FileText },
];

// --- Reusable Components ---

// A general card component with consistent styling
const DashboardCard = ({ title, children, className = '' }) => (
  <div className={`p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
    {/* I've updated the icon here for consistency with the image, using ShieldCheck as a generic indicator */}
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <ShieldCheck className="w-5 h-5 text-indigo-500 mr-2" />
      {title}
    </h3>
    {children}
  </div>
);

// --- Sidebar Component ---

const Sidebar = ({ activeItem, setActiveItem }) => (
  <aside className="w-64 bg-white border-r border-gray-100 p-4 flex flex-col h-full fixed top-0 left-0">
    {/* Logo/Header */}
    <div className="flex items-center space-x-2 pb-6 border-b border-gray-100">
      <div className="p-1 bg-indigo-500 rounded-full">
        {/* Using Briefcase as a professional logo icon */}
        <Briefcase className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800">TaxWise</h1>
        <p className="text-xs text-gray-500">Finance Manager</p>
      </div>
    </div>

    {/* Navigation Menu */}
    <nav className="mt-6 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.name;
        return (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  </aside>
);

// --- Dashboard Content Components ---

const FinancialOverview = () => (
  <DashboardCard title="Financial Overview" className="lg:col-span-2">
    <div className="flex justify-around items-center border-b border-gray-100 pb-4 mb-4">
      {/* Total Income */}
      <div className="flex flex-col items-center p-3 w-1/2">
        <div className="flex items-center mb-1">
          <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
          <span className="text-gray-500 text-sm font-medium">Total Income</span>
        </div>
        <div className="flex items-center text-2xl font-bold text-green-600">
          <IndianRupee className="w-4 h-4" />
          0
        </div>
      </div>
      <div className="h-10 w-px bg-gray-200"></div> {/* Separator */}
      {/* Total Expenses */}
      <div className="flex flex-col items-center p-3 w-1/2">
        <div className="flex items-center mb-1">
          <TrendingDown className="w-5 h-5 text-red-500 mr-1" />
          <span className="text-gray-500 text-sm font-medium">Total Expenses</span>
        </div>
        <div className="flex items-center text-2xl font-bold text-red-600">
          <IndianRupee className="w-4 h-4" />
          0
        </div>
      </div>
    </div>

    {/* No Data Yet Section */}
    <div className="text-center py-8">
      {/* Placeholder for the graphic - using a simple SVG illustration */}
      <svg
        className="w-20 h-20 mx-auto text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 12l3-3 3 3 4-4M7 21a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 14v4a2 2 0 002 2M17 14h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 9a3 3 0 100-6 3 3 0 000 6z"
        />
      </svg>
      <p className="text-base font-semibold text-gray-600 mt-2">No Data Yet</p>
      <p className="text-sm text-gray-500 mt-1">
        Upload your financial data to see insights here!
      </p>
    </div>
  </DashboardCard>
);

const TaxStatus = () => (
  <DashboardCard title="Tax Status" className="lg:col-span-1">
    <div className="text-center py-8">
      {/* Placeholder for the graphic - using a colorful box-like icon */}
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50">
        <Sliders className="w-8 h-8 text-indigo-500" />
      </div>

      <p className="text-base font-semibold text-gray-700 mt-4">
        Ready to optimize?
      </p>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Run a simulation to see your tax liability.
      </p>
      <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
        Calculate Tax
      </button>
    </div>
  </DashboardCard>
);

const CIBILHealth = () => (
  <DashboardCard title="CIBIL Health" className="lg:col-span-1">
    <div className="text-center py-4">
      {/* Using Building icon to represent a bank/financial institution for CIBIL */}
      <Building className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
      <p className="text-base font-semibold text-gray-700">
        Check your CIBIL score
      </p>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Get personalized tips to improve your credit health.
      </p>
      <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md">
        Analyze Score
      </button>
    </div>
  </DashboardCard>
);

const ActionCenter = () => (
  <DashboardCard title="Action Center" className="lg:col-span-1">
    <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
      <div className="p-2 bg-blue-500 rounded-full text-white mr-4">
        <Upload className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-blue-800">Upload your statements</p>
        <p className="text-xs text-blue-600">Get started by importing your data.</p>
      </div>
    </div>
  </DashboardCard>
);

// --- Main App Component ---

const App = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans antialiased">
      {/* 1. Sidebar */}
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* 2. Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mt-1">
            Here's your financial snapshot for today.
          </p>
        </header>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Row: Financial Overview (2/3 width) and CIBIL Health (1/3 width) */}
          <FinancialOverview />
          <CIBILHealth />

          {/* Bottom Row: Tax Status (1/3 width) and Action Center (1/3 width) */}
          <TaxStatus />
          <ActionCenter />
        </div>
      </main>
    </div>
  );
};

export default App;
