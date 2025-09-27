import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  BarChart2,
  ListOrdered,
  Calendar,
  IndianRupee,
  TrendingUp,
  CreditCard,
  Target,
} from 'lucide-react';

// Mock data for the Visualization and Table
const MOCK_FINANCIAL_DATA = [
  { month: 'Jan', income: 85000, expense: 52000, taxSavings: 5000 },
  { month: 'Feb', income: 92000, expense: 61000, taxSavings: 6500 },
  { month: 'Mar', income: 78000, expense: 45000, taxSavings: 4200 },
  { month: 'Apr', income: 95000, expense: 58000, taxSavings: 7100 },
  { month: 'May', income: 105000, expense: 65000, taxSavings: 8000 },
  { month: 'Jun', income: 88000, expense: 51000, taxSavings: 5500 },
];

const MOCK_TRANSACTIONS = [
    { date: '2024-06-28', description: 'Salary Deposit', category: 'Income', amount: 90000, type: 'Credit' },
    { date: '2024-06-29', description: 'LIC Premium', category: 'Tax Saving', amount: 15000, type: 'Debit' },
    { date: '2024-07-01', description: 'Rent Payment', category: 'Housing', amount: 30000, type: 'Debit' },
    { date: '2024-07-02', description: 'Investment - SIP', category: 'Investment', amount: 10000, type: 'Debit' },
    { date: '2024-07-03', description: 'Groceries', category: 'Essentials', amount: 5200, type: 'Debit' },
];

// --- Helper Components ---

const formatRupee = (amount) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
}).format(amount);


// Simple Bar Chart Visualization Component (simulated using divs)
const SimpleBarChart = ({ data }) => {
  // Use Tax Savings as the primary focus for this report
  const maxAmount = Math.max(...data.flatMap(d => [d.taxSavings, 8000])); // Ensure max is at least 8000 for scale
  const chartHeight = 150;

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100">
      <h4 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
        <IndianRupee className="w-4 h-4 mr-2 text-indigo-500" />
        Monthly Tax Savings Breakdown
      </h4>
      <div className="flex justify-between items-end h-[150px] space-x-6 px-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-grow group relative">
            {/* Tax Savings Bar */}
            <div
              className="w-8 bg-green-500 rounded-t-lg transition-all duration-300 hover:bg-green-600 cursor-pointer"
              style={{ height: `${(item.taxSavings / maxAmount) * chartHeight}px` }}
            >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-90">
                    {item.month}: {formatRupee(item.taxSavings)}
                </div>
            </div>
            <span className="text-sm font-medium mt-2 text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">Savings achieved through deductions (e.g., 80C, HRA, etc.)</p>
    </div>
  );
};

// Report Generator Component
const ReportGenerator = () => {
  const [reportType, setReportType] = useState('tax_summary');
  const [format, setFormat] = useState('csv');
  const [startDate, setStartDate] = useState('2024-04-01');
  const [endDate, setEndDate] = useState('2025-03-31');

  // Using a custom modal/message box instead of alert()
  const [message, setMessage] = useState('');

  const handleGenerate = () => {
    console.log(`Generating ${reportType} report for ${startDate} to ${endDate} in ${format} format.`);
    
    // Simulate file download
    const mockFileContent = `Report Type: ${reportType}\nPeriod: ${startDate} to ${endDate}\nGenerated on: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([mockFileContent], { type: format === 'pdf' ? 'application/pdf' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `TaxWise_Report_${reportType}_${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setMessage(`Report generation simulated! Downloading TaxWise_Report_${reportType}_${Date.now()}.${format}`);
    setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500">
      <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2" />
        Generate Official Report
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Report Type */}
        <div>
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
            <ListOrdered className="w-4 h-4 inline mr-1 text-gray-500" />
            Report Content
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="tax_summary">Tax Summary (Filing)</option>
            <option value="detailed_transactions">Detailed Transactions</option>
            <option value="expense_proofs">Expense Proofs</option>
          </select>
        </div>

        {/* Format */}
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="w-4 h-4 inline mr-1 text-gray-500" />
            File Format
          </label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="pdf">PDF (.pdf)</option>
            <option value="csv">CSV (.csv)</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1 text-gray-500" />
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1 text-gray-500" />
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        {message && (
            <div className="text-sm text-green-700 font-semibold p-2 rounded bg-green-100 transition-opacity duration-300">
                {message}
            </div>
        )}
        <button
          onClick={handleGenerate}
          className="ml-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 flex items-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Generate & Download Report
        </button>
      </div>
    </div>
  );
};

// --- Main Reports Page Component ---

const ReportsPage = () => {

    const currentTaxableIncome = 950000;
    const projectedTax = 125000;
    const deductionsUsed = 150000;
    const maxDeductions = 250000;

    const deductionProgress = Math.min(100, (deductionsUsed / maxDeductions) * 100);

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Financial & Tax Reporting Center
        </h2>
        <p className="text-gray-500 mt-1">
          Deep-dive into your financial data, tax projections, and download official documents.
        </p>
      </header>

      <div className="space-y-8">
        {/* Report Generation Tool */}
        <ReportGenerator />

        {/* Tax Projection and Summary Section */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Target className="w-5 h-5 text-red-500 mr-2" />
                Current Tax Projection (FY 2024-25)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-700">Taxable Income</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{formatRupee(currentTaxableIncome)}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-red-700">Projected Tax Liability</p>
                    <p className="text-2xl font-bold text-red-800 mt-1">{formatRupee(projectedTax)}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-700">Deductions Used (80C/HRA)</p>
                    <p className="text-2xl font-bold text-green-800 mt-1">{formatRupee(deductionsUsed)}</p>
                </div>
            </div>

            {/* Deduction Progress Bar */}
            <h4 className="text-md font-semibold text-gray-700 mb-2">Deduction Utilization Progress</h4>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${deductionProgress}%` }}
                />
            </div>
            <p className="text-sm text-gray-600 mt-2">
                You have utilized **{Math.round(deductionProgress)}%** of the potential maximum tax deductions ({formatRupee(maxDeductions)}).
            </p>
        </div>


        {/* Visualization and Transaction Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart (Span 1) */}
            <div className="lg:col-span-1 p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <BarChart2 className="w-5 h-5 text-indigo-500 mr-2" />
                    Savings Performance
                </h3>
                <SimpleBarChart data={MOCK_FINANCIAL_DATA} />
            </div>
            
            {/* Transaction Table (Span 2) */}
            <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 text-indigo-500 mr-2" />
                    Recent Financial Transactions
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {MOCK_TRANSACTIONS.map((tx, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            tx.type === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.type === 'Credit' ? '+' : '-'} {formatRupee(tx.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-4">
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150">
                        View All Transactions &rarr;
                    </button>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
};

export default ReportsPage;
