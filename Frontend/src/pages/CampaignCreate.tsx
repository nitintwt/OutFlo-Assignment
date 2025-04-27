import React from 'react';
import Layout from '../components/Layout/Layout';
import CampaignForm from '../components/Campaign/CampaignForm';
import Card from '../components/UI/Card';
import { Campaign } from '../utils/types';

const CampaignCreate: React.FC = () => {
  const handleSubmit = (campaign: Partial<Campaign>) => {
    // In a real application, this would send the data to an API
    console.log('Creating campaign:', campaign);
  };
  
  const handleCancel = () => {
    // In a real application, this would navigate back to the campaigns list
    console.log('Cancelling campaign creation');
  };
  
  return (
    <Layout title="Create Campaign" subtitle="Set up a new marketing campaign">
      <Card className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Details</h2>
        <CampaignForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </Layout>
  );
};

export default CampaignCreate;