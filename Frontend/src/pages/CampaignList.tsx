import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import CampaignCard from '../components/Campaign/CampaignCard';
import Button from '../components/UI/Button';
import { mockCampaigns } from '../utils/mockData';
import { Campaign } from '../utils/types';
import { PlusCircle, FilterIcon } from 'lucide-react';
import Select from '../components/UI/Select';

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  
  const handleCreateCampaign = () => {
    // In a real application, this would navigate to the campaign creation page
    console.log("Navigate to campaign creation page");
  };
  
  const handleEditCampaign = (id: string) => {
    console.log(`Edit campaign with id: ${id}`);
  };
  
  const handleToggleCampaign = (id: string, newStatus: 'active' | 'inactive') => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: newStatus } 
        : campaign
    ));
  };
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || campaign.platform === platformFilter;
    return matchesStatus && matchesPlatform;
  });
  
  return (
    <Layout title="Campaigns" subtitle="Manage your marketing campaigns">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">All Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button 
          
          onClick={handleCreateCampaign}
          icon={<PlusCircle className="h-4 w-4" />}
        >
          New Campaign
        </Button>
      </div>
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-1/2">
          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          
          <Select
            options={[
              { value: 'all', label: 'All Platforms' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'email', label: 'Email' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'twitter', label: 'Twitter' },
            ]}
            value={platformFilter}
            onChange={setPlatformFilter}
          />
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onEdit={handleEditCampaign}
            onToggle={handleToggleCampaign}
          />
        ))}
        
        {filteredCampaigns.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No campaigns found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new campaign.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CampaignList;