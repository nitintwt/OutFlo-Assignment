import React from 'react';
import { Campaign } from '../../utils/types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { Calendar, DollarSign, Target, Share2 } from 'lucide-react';
import {Button, ButtonGroup} from "@heroui/button";


interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onToggle: (id: string, newStatus: 'active' | 'inactive') => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onEdit, onToggle }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </div>;
      case 'email':
        return <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </div>;
      case 'facebook':
        return <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        </div>;
      case 'twitter':
        return <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        </div>;
      default:
        return <Share2 className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card hoverable className="overflow-hidden transition-all duration-300 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          {getPlatformIcon(campaign.platform)}
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{campaign.description}</p>
          </div>
        </div>
        <Badge status={campaign.status} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">
            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
          </span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">
            ${campaign.budget.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center">
          <Target className="h-5 w-5 text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">
            {campaign.goal}
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="ml-2 text-sm text-gray-500">
            {campaign.metrics.CTR}% CTR
          </span>
        </div>
      </div>
      
      <div className="mt-5 border-t border-gray-100 pt-4 flex justify-between">
        <Button
          //color={campaign.status === 'active' ? "danger" : "primary"}
          color='danger'
          className={campaign.status ==='active' ? 'bg-red-600 rounded-sm':"bg-blue-600"}
          size="sm"
          onClick={() => onToggle(
            campaign.id, 
            campaign.status === 'active' ? 'inactive' : 'active'
          )}
        >
          {campaign.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
    </Card>
  );
};

export default CampaignCard;