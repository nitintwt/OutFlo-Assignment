import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import CampaignCard from '../components/Campaign/CampaignCard';
import CampaignList from '../components/Campaign/CampaignList';
import Button from '../components/UI/Button';
import { mockCampaigns } from '../utils/mockData';
import { Campaign } from '../utils/types';
import { PlusCircle } from 'lucide-react';

const Campaigns: React.FC<{
  currentPage: string;
  onNavigate: (page: string) => void;
  onCreateClick: () => void;
}> = ({ currentPage, onNavigate, onCreateClick }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  
  const handleToggleCampaign = (id: string, newStatus: 'active' | 'inactive') => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: newStatus } 
        : campaign
    ));
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };
  
  return (
    <Layout 
      title="Campaigns" 
      subtitle="Manage your marketing campaigns"
      currentPage={currentPage}
      onNavigate={onNavigate}
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button 
          className='bg-blue-700'
          onClick={onCreateClick}
          icon={<PlusCircle className="h-4 w-4" />}
        >
          New Campaign
        </Button>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.filter(c => c.status === 'active').map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onEdit={() => {}}
            onToggle={handleToggleCampaign}
          />
        ))}
      </div>

      <CampaignList 
        campaigns={campaigns}
        onToggle={handleToggleCampaign}
        onDelete={handleDeleteCampaign}
      />
    </Layout>
  );
};

export default Campaigns;