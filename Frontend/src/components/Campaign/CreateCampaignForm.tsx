import React, { useState } from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { Campaign } from '../../utils/types';
import { X, Save } from 'lucide-react';

interface CreateCampaignFormProps {
  onCancel: () => void;
  onSubmit: (campaign: Partial<Campaign>) => void;
}

const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    platform: 'linkedin',
    status: 'inactive',
    goal: '',
    budget: 0,
    startDate: '',
    endDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            onChange={(value) => handleChange({
              target: { name: 'platform', value }
            } as React.ChangeEvent<HTMLSelectElement>)}
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
            placeholder="e.g., Increase brand awareness"
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
          onChange={(value) => handleChange({
            target: { name: 'status', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
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
            Create Campaign
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateCampaignForm;