import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Sliders, ShieldCheck, FileText } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Upload', icon: UploadCloud, path: '/upload' },
  { name: 'Tax Optimizer', icon: Sliders, path: '/taxoptimizer' },
  { name: 'CIBIL Advisor', icon: ShieldCheck, path: '/cibiladvisor' },
  { name: 'Reports', icon: FileText, path: '/report' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // toggle state
  const location = useLocation();

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      {/* Logo + toggle button */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && <h1 className="text-xl font-bold">TaxWise</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded hover:bg-gray-200"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-2 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded transition-colors duration-200 ${
                isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

