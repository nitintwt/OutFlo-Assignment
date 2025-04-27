import React, { useState } from 'react';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { Campaign } from '../../utils/types';
import { Save, X } from 'lucide-react';

interface CampaignFormProps {
  campaign?: Campaign;
  onSubmit: (campaign: Partial<Campaign>) => void;
  onCancel: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Campaign>>(
    campaign || {
      name: '',
      description: '',
      status: 'inactive',
      platform: 'linkedin',
      goal: '',
      budget: 0,
      startDate: '',
      endDate: '',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Campaign Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Select
            label="Platform"
            name="platform"
            value={formData.platform}
            onChange={(value) => handleSelectChange('platform', value)}
            options={[
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'email', label: 'Email' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'twitter', label: 'Twitter' },
            ]}
          />
        </div>

        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          />
          <Input
            label="Budget ($)"
            name="budget"
            type="number"
            min="0"
            step="100"
            value={formData.budget?.toString()}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={(value) => handleSelectChange('status', value)}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />

        <div className="flex justify-end space-x-3 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            icon={<X className="h-4 w-4" />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={<Save className="h-4 w-4" />}
          >
            {campaign ? 'Update Campaign' : 'Create Campaign'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CampaignForm;