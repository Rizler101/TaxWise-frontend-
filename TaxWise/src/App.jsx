import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import TaxOptimizer from './pages/TaxOptimizer';
import CibilAdvisor from './pages/CibilAdvisor';
import Report from './pages/Report';

function App() {
  return (
   
      <div className="flex min-h-screen">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />       {/* default page */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/taxoptimizer" element={<TaxOptimizer />} />
            <Route path="/cibiladvisor" element={<CibilAdvisor />} />
            <Route path="/report" element={<Report />} />   {/* optional */}
          </Routes>

        </main>
      </div>
    
  );
}

export default App;
