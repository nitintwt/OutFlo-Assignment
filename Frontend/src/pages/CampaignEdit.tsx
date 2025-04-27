import React from 'react';
import Layout from '../components/Layout/Layout';
import CampaignForm from '../components/Campaign/CampaignForm';
import Card from '../components/UI/Card';
import { Campaign } from '../utils/types';
import { mockCampaigns } from '../utils/mockData';

// In a real app, we'd get the ID from the URL parameters
const CampaignEdit: React.FC = () => {
  // For demo purposes, just use the first campaign
  const campaign = mockCampaigns[0];
  
  const handleSubmit = (updatedCampaign: Partial<Campaign>) => {
    // In a real application, this would send the data to an API
    console.log('Updating campaign:', {
      ...campaign,
      ...updatedCampaign
    });
  };
  
  const handleCancel = () => {
    // In a real application, this would navigate back to the campaigns list
    console.log('Cancelling campaign edit');
  };
  
  return (
    <Layout title="Edit Campaign" subtitle="Update your campaign details">
      <Card className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Details</h2>
        <CampaignForm 
          campaign={campaign}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </Layout>
  );
};

export default CampaignEdit;