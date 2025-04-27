import React from 'react';
import { Campaign } from '../../utils/types';
import Button from '../UI/Button';
import { Trash2 } from 'lucide-react';

interface CampaignListProps {
  campaigns: Campaign[];
  onToggle: (id: string, newStatus: 'active' | 'inactive') => void;
  onDelete: (id: string) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns, onToggle, onDelete }) => {
  return (
    <div className="mt-6">
      <div className="overflow-hidden bg-white shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leads
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.goal}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">{campaign.platform}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    //variant={campaign.status === 'active' ? 'success' : 'outline'}
                    className={campaign.status ==='active'? "bg-blue-400": "bg-gray-300 text-blue-200"}
                    onClick={() => onToggle(
                      campaign.id,
                      campaign.status === 'active' ? 'inactive' : 'active'
                    )}
                  >
                    {campaign.status === 'active' ? 'Active' : 'Inactive'}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{campaign.metrics.conversions} leads</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(campaign.id)}
                    icon={<Trash2 className="h-4 w-4 text-gray-500" />}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignList;