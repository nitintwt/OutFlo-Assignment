import React from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import MetricCard from '../components/UI/MetricCard';
import CampaignCard from '../components/Campaign/CampaignCard';
import Button from '../components/UI/Button';
import { mockCampaigns, dashboardMetrics} from '../utils/mockData';
import { PlusCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Use only the 3 most recent campaigns for the dashboard
  const recentCampaigns = mockCampaigns.slice(0, 3);
  
  const handleCreateCampaign = () => {
    // In a real application, this would navigate to the campaign creation page
    console.log("Navigate to campaign creation page");
  };
  
  const handleEditCampaign = (id: string) => {
    console.log(`Edit campaign with id: ${id}`);
  };
  
  const handleToggleCampaign = (id: string, newStatus: 'active' | 'inactive') => {
    console.log(`Toggle campaign ${id} to ${newStatus}`);
  };
  
  return (
    <Layout title="Dashboard" subtitle="Welcome back, Alex">
      <div className="space-y-8">
        {/* Metrics Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {dashboardMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.name}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
            />
          ))}
        </div>
        
        {/* Recent Campaigns Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Recent Campaigns</h2>
            <Button 
              size="sm"
              onClick={handleCreateCampaign}
              icon={<PlusCircle className="h-4 w-4" />}
            >
              New Campaign
            </Button>
          </div>
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {recentCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEditCampaign}
                onToggle={handleToggleCampaign}
              />
            ))}
          </div>
        </div>
        
        {/* Quick Actions and Tips */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-white/20 bg-white/10 text-white hover:bg-white/20">
                Generate LinkedIn message
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 bg-white/10 text-white hover:bg-white/20">
                Schedule a new campaign
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 bg-white/10 text-white hover:bg-white/20">
                View analytics report
              </Button>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-medium mb-3">Campaign Tips</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex">
                <span className="text-primary-600 mr-2">•</span>
                <span>Use personalized messages for 40% higher response rates</span>
              </li>
              <li className="flex">
                <span className="text-primary-600 mr-2">•</span>
                <span>Tuesday and Wednesday mornings show the highest engagement</span>
              </li>
              <li className="flex">
                <span className="text-primary-600 mr-2">•</span>
                <span>Include a clear call-to-action in every message</span>
              </li>
              <li className="flex">
                <span className="text-primary-600 mr-2">•</span>
                <span>Follow up within 3 days to maximize conversion</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;