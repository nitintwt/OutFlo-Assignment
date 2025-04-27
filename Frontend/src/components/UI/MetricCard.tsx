import React from 'react';
import Card from './Card';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType,
  className = ''
}) => {
  return (
    <Card className={`transition-all duration-300 hover:translate-y-[-4px] ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-1 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <div className={`ml-2 flex items-baseline text-sm font-medium ${
          changeType === 'increase' ? 'text-success-600' : 'text-error-600'
        }`}>
          {changeType === 'increase' ? (
            <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-success-500" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-error-500" aria-hidden="true" />
          )}
          <span className="ml-1">{change}%</span>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;