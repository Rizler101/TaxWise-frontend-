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
  ChevronLeft,
  Shield,
  PlusCircle,
} from 'lucide-react';

// ======================
// Helper Components
// ======================

// Format currency
const formatRupees = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

// Income Input Component
const IncomeInput = ({ icon: Icon, label, description, value = 0, onChange, name, max, min = 0 }) => (
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
        onChange={(e) => {
          let num = parseFloat(e.target.value) || 0;
          if (max !== undefined) num = Math.min(max, num);
          onChange({ target: { name, value: num } });
        }}
        placeholder="0"
        className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-lg"
        min={min}
        max={max}
      />
      <IndianRupee className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    {max !== undefined && <p className="text-xs text-gray-500">Max Limit: {formatRupees(max)}</p>}
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

// Stepper Indicator
const StepIndicator = ({ id, name, icon: Icon, currentStep }) => {
  const isActive = id === currentStep;
  const isCompleted = id < currentStep;

  return (
    <div className="flex-1 text-center">
      <div className={`flex items-center justify-center mx-auto w-12 h-12 rounded-full mb-2 ${
        isActive ? 'bg-indigo-500 text-white shadow-lg'
        : isCompleted ? 'bg-green-500 text-white shadow-lg'
        : 'bg-gray-100 text-gray-400'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className={`text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>{name}</p>
    </div>
  );
};

// ======================
// Step Components
// ======================

const IncomeDetailsStep = ({ formData, setFormData, totalAnnualIncome, setStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IncomeInput
          icon={DollarSign} label="Basic Salary" description="Annual basic salary"
          name="basicSalary" value={formData.basicSalary} onChange={handleChange}
        />
        <IncomeInput
          icon={Home} label="HRA Allowance" description="House Rent Allowance"
          name="hraAllowance" value={formData.hraAllowance} onChange={handleChange}
        />
        <IncomeInput
          icon={DollarSign} label="Other Allowances" description="Special allowances"
          name="otherAllowances" value={formData.otherAllowances} onChange={handleChange}
        />
        <IncomeInput
          icon={Briefcase} label="Freelance/Business Income" description="Income from freelancing or business"
          name="freelanceIncome" value={formData.freelanceIncome} onChange={handleChange}
        />
        <IncomeInput
          icon={TrendingUp} label="Investment Income" description="Interest & dividends"
          name="investmentIncome" value={formData.investmentIncome} onChange={handleChange}
        />
        <IncomeInput
          icon={Home} label="Rental Income" description="Net property income"
          name="rentalIncome" value={formData.rentalIncome} onChange={handleChange}
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-8">
        <div className="flex items-center text-xl font-bold text-gray-800">
          Total Annual Income
        </div>
        <div className="text-2xl font-extrabold text-green-600 flex items-center">
          <IndianRupee className="w-5 h-5" />
          {totalAnnualIncome.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition shadow-lg flex items-center"
        >
          Next: Deductions
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

const DeductionsStep = ({ formData, setFormData, setStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const totalDeductions =
    (formData.sec80cInvestment || 0) +
    (formData.sec80dPremium || 0) +
    (formData.homeLoanInterest || 0) +
    (formData.sec80gDonation || 0);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IncomeInput
          icon={Shield} label="Sec 80C Investments" description="PPF, ELSS, Life Ins, EPF"
          name="sec80cInvestment" value={formData.sec80cInvestment} onChange={handleChange} max={150000}
        />
        <IncomeInput
          icon={Shield} label="Sec 80D Premium" description="Medical Insurance"
          name="sec80dPremium" value={formData.sec80dPremium} onChange={handleChange} max={25000}
        />
        <IncomeInput
          icon={Home} label="Home Loan Interest" description="Interest on self-occupied property"
          name="homeLoanInterest" value={formData.homeLoanInterest} onChange={handleChange} max={200000}
        />
        <IncomeInput
          icon={PlusCircle} label="Sec 80G Donations" description="Donations to eligible institutions"
          name="sec80gDonation" value={formData.sec80gDonation} onChange={handleChange}
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-8">
        <div className="flex items-center text-xl font-bold text-gray-800">
          Total Deductions
        </div>
        <div className="text-2xl font-extrabold text-red-600 flex items-center">
          <IndianRupee className="w-5 h-5" />
          {totalDeductions.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition shadow-lg flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Income
        </button>
        <button
          onClick={() => setStep(3)}
          className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition shadow-lg flex items-center"
        >
          Next: Results <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

// ======================
// Results Step (unchanged, safe)
// ======================
const ResultsStep = ({ formData, setStep, totalAnnualIncome }) => (
  <div className="p-8">
    <h3 className="text-xl font-bold mb-4">Results Step (AI logic here)</h3>
    <p>Total Income: {formatRupees(totalAnnualIncome)}</p>
    <p>Deductions Summary:</p>
    <ul>
      <li>80C: {formatRupees(formData.sec80cInvestment)}</li>
      <li>80D: {formatRupees(formData.sec80dPremium)}</li>
      <li>Home Loan Interest: {formatRupees(formData.homeLoanInterest)}</li>
      <li>80G: {formatRupees(formData.sec80gDonation)}</li>
    </ul>
    <div className="mt-8 flex justify-between">
      <button
        onClick={() => setStep(2)}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg"
      >
        <ChevronLeft className="w-5 h-5 mr-2" /> Previous
      </button>
      <button
        onClick={() => setStep(1)}
        className="px-6 py-3 bg-red-500 text-white rounded-lg"
      >
        Restart
      </button>
    </div>
  </div>
);

// ======================
// Main Tax Optimizer Page
// ======================
const TaxOptimizerPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    financialYear: '2024-25',
    basicSalary: 0,
    hraAllowance: 0,
    otherAllowances: 0,
    freelanceIncome: 0,
    investmentIncome: 0,
    rentalIncome: 0,
    sec80cInvestment: 0,
    sec80dPremium: 0,
    homeLoanInterest: 0,
    sec80gDonation: 0,
  });

  const totalAnnualIncome = (
    (formData.basicSalary || 0) +
    (formData.hraAllowance || 0) +
    (formData.otherAllowances || 0) +
    (formData.freelanceIncome || 0) +
    (formData.investmentIncome || 0) +
    (formData.rentalIncome || 0)
  );

  const steps = [
    { id: 1, name: 'Income Details', icon: Zap },
    { id: 2, name: 'Deductions', icon: Filter },
    { id: 3, name: 'Results', icon: BarChart2 },
  ];

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Tax Optimizer</h2>
        <p className="text-gray-500 mt-1">Maximize savings with AI-powered insights</p>
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
        {step === 1 && <IncomeDetailsStep formData={formData} setFormData={setFormData} totalAnnualIncome={totalAnnualIncome} setStep={setStep} />}
        {step === 2 && <DeductionsStep formData={formData} setFormData={setFormData} setStep={setStep} />}
        {step === 3 && <ResultsStep formData={formData} totalAnnualIncome={totalAnnualIncome} setStep={setStep} />}
      </div>
    </main>
  );
};

export default TaxOptimizerPage;
