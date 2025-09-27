import React, { useState } from 'react';
import {
  IndianRupee,
  DollarSign,
  Home,
  Briefcase,
  TrendingUp,
  Zap,
  Filter,
  BarChart2,
  ChevronRight,
} from 'lucide-react';

// Input Field Component for Tax Optimizer
const IncomeInput = ({ icon: Icon, label, description, value, onChange, name, placeholder = '0' }) => (
  <div className="w-full">
    <label htmlFor={name} className="text-gray-700 font-medium flex items-center mb-1">
      <Icon className="w-4 h-4 text-orange-600 mr-2" />
      {label}
    </label>
    <div className="relative mb-1">
      <input
        id={name}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-lg"
      />
      <IndianRupee className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

// Stepper Indicator Component
const StepIndicator = ({ id, name, icon: Icon, currentStep }) => {
  const isActive = id === currentStep;
  const isCompleted = id < currentStep;

  return (
    <div className="flex-1 text-center">
      <div className={`flex items-center justify-center mx-auto w-12 h-12 rounded-full mb-2 ${
        isActive
          ? 'bg-indigo-500 text-white shadow-lg'
          : isCompleted
            ? 'bg-green-100 text-green-600'
            : 'bg-gray-100 text-gray-400'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className={`text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>{name}</p>
    </div>
  );
};

// --- Step Content Components ---

const IncomeDetailsStep = ({ formData, setFormData, totalAnnualIncome, setStep }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0 // Parse as float, default to 0 if invalid
    }));
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <DollarSign className="w-5 h-5 text-gray-700 mr-2" />
        <h4 className="text-xl font-semibold text-gray-800">Income Details</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Financial Year Selector */}
        <div className="md:col-span-2">
          <label htmlFor="financialYear" className="text-sm font-medium text-gray-700 block mb-1">Financial Year</label>
          <select
            id="financialYear"
            name="financialYear"
            value={formData.financialYear}
            onChange={handleChange}
            className="w-48 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>
        </div>

        <IncomeInput
          icon={DollarSign}
          label="Basic Salary (Annual)"
          description="Your annual basic salary"
          name="basicSalary"
          value={formData.basicSalary}
          onChange={handleChange}
        />
        <IncomeInput
          icon={Home}
          label="House Rent Allowance (HRA)"
          description="HRA received from employer"
          name="hra"
          value={formData.hra}
          onChange={handleChange}
        />
        <IncomeInput
          icon={DollarSign}
          label="Other Allowances"
          description="Special allowances, bonuses etc."
          name="otherAllowances"
          value={formData.otherAllowances}
          onChange={handleChange}
        />
        <IncomeInput
          icon={Briefcase}
          label="Freelance/Business Income"
          description="Income from freelancing or business"
          name="freelanceIncome"
          value={formData.freelanceIncome}
          onChange={handleChange}
        />
        <IncomeInput
          icon={TrendingUp}
          label="Investment Income"
          description="Interest, dividends, capital gains"
          name="investmentIncome"
          value={formData.investmentIncome}
          onChange={handleChange}
        />
        <IncomeInput
          icon={Home}
          label="Rental Income"
          description="Income from property rental"
          name="rentalIncome"
          value={formData.rentalIncome}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center text-xl font-bold text-gray-800">
          <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
          Total Annual Income
        </div>
        <div className="text-2xl font-extrabold text-indigo-600 flex items-center">
          <IndianRupee className="w-5 h-5" />
          {totalAnnualIncome.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-lg flex items-center justify-center ml-auto"
        >
          Next: Add Deductions
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

const DeductionsStep = ({ setStep }) => (
  <div className="p-8 text-center h-96 flex flex-col items-center justify-center">
    <p className="text-xl text-gray-500 mb-4">
      Deductions Step (To be implemented...)
    </p>
    <button
      onClick={() => setStep(3)}
      className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-lg flex items-center justify-center"
    >
      Next: View Results
      <ChevronRight className="w-5 h-5 ml-2" />
    </button>
  </div>
);

const ResultsStep = ({ setStep }) => (
  <div className="p-8 text-center h-96 flex flex-col items-center justify-center">
    <p className="text-xl text-gray-500 mb-4">
      Results Step (To be implemented...)
    </p>
    <button
      onClick={() => setStep(1)}
      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-lg"
    >
      Restart Calculation
    </button>
  </div>
);


// --- Main Tax Optimizer Component ---

const TaxOptimizerPage = () => {
  const [step, setStep] = useState(1); // 1: Income Details, 2: Deductions, 3: Results
  const [formData, setFormData] = useState({
    financialYear: '2024-25',
    basicSalary: 0,
    hra: 0,
    otherAllowances: 0,
    freelanceIncome: 0,
    investmentIncome: 0,
    rentalIncome: 0,
  });

  const steps = [
    { id: 1, name: 'Income Details', icon: Zap },
    { id: 2, name: 'Deductions', icon: Filter },
    { id: 3, name: 'Results', icon: BarChart2 },
  ];

  // Calculate total annual income
  const totalAnnualIncome = Object.keys(formData)
    .filter(key => key !== 'financialYear') // Exclude non-numeric fields
    .map(key => formData[key])
    .reduce((sum, current) => sum + current, 0);


  return (
    <main className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Tax Optimizer
        </h2>
        <p className="text-gray-500 mt-1">
          Find the best tax regime and maximize your savings with AI-powered insights.
        </p>
      </header>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        {/* Stepper */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          {steps.map((s, index) => (
            <React.Fragment key={s.id}>
              <StepIndicator id={s.id} name={s.name} icon={s.icon} currentStep={step} />
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 ${step > s.id ? 'bg-indigo-500' : 'bg-gray-200'} transition-all duration-300`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <IncomeDetailsStep
            formData={formData}
            setFormData={setFormData}
            totalAnnualIncome={totalAnnualIncome}
            setStep={setStep}
          />
        )}
        {step === 2 && <DeductionsStep setStep={setStep} />}
        {step === 3 && <ResultsStep setStep={setStep} />}
      </div>
    </main>
  );
};

export default TaxOptimizerPage;
