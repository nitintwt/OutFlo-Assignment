import React from 'react';
import { BarChart3 } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, currentPage, onNavigate }) => {
  return (
    <header className="bg-white shadow-subtle">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 py-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">CampaignPro</h1>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onNavigate('campaigns')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'campaigns'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => onNavigate('linkedin-generator')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'linkedin-generator'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              LinkedIn Generator
            </button>
          </nav>
        </div>
        
        {(title || subtitle) && (
          <div className="border-t border-gray-200 py-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;