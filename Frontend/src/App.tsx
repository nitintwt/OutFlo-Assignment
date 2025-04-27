import React from 'react';
import Campaigns from './pages/Campaigns';
import LinkedInGenerator from './pages/LinkedinGenerator';
import CreateCampaignForm from './components/Campaign/CreateCampaignForm';

function App() {
  const [currentPage, setCurrentPage] = React.useState('campaigns');
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  
  const handleCreateSubmit = (campaignData: any) => {
    console.log('Campaign data:', campaignData);
    setShowCreateForm(false);
  };
  
  const renderPage = () => {
    if (showCreateForm) {
      return (
        <div className="container mx-auto px-4 py-6">
          <CreateCampaignForm
            onCancel={() => setShowCreateForm(false)}
            onSubmit={handleCreateSubmit}
          />
        </div>
      );
    }
    
    switch (currentPage) {
      case 'linkedin-generator':
        return <LinkedInGenerator currentPage={currentPage} onNavigate={setCurrentPage} />;
      default:
        return (
          <Campaigns 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
            onCreateClick={() => setShowCreateForm(true)}
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;
