import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import LinkedInForm from '../components/Linkedin/LinkedinForm';
import MessagePreview from '../components/Linkedin/MessagePreview';
import { LinkedInProfile } from '../utils/types';
import { mockMessage } from '../utils/mockData';

const LinkedInGenerator: React.FC<{
  currentPage: string;
  onNavigate: (page: string) => void;
}> = ({ currentPage, onNavigate }) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  const handleGenerateMessage = (profile: LinkedInProfile) => {
    setMessage(mockMessage);
    setShowPreview(true);
  };
  
  return (
    <Layout 
      title="LinkedIn Message Generator" 
      subtitle="Create personalized outreach messages"
      currentPage={currentPage}
      onNavigate={onNavigate}
    >
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">LinkedIn Profile Data</h2>
          <LinkedInForm onGenerateMessage={handleGenerateMessage} />
        </Card>
        
        {(showPreview || message) && (
          <MessagePreview message={message} />
        )}
      </div>
    </Layout>
  );
};

export default LinkedInGenerator;