import React, { useState } from 'react';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';
import Button from '../UI/Button';
import { LinkedInProfile } from '../../utils/types';
import { mockLinkedInProfile , mockMessage } from '../../utils/mockData';
import { RefreshCw } from 'lucide-react';

interface LinkedInFormProps {
  onGenerateMessage: (profile: LinkedInProfile) => void;
}

const LinkedInForm: React.FC<LinkedInFormProps> = ({ onGenerateMessage }) => {
  const [profile, setProfile] = useState<LinkedInProfile>(mockLinkedInProfile);
  const [interests, setInterests] = useState<string>(mockLinkedInProfile.interests.join(', '));
  const [connections, setConnections] = useState<string>(mockLinkedInProfile.commonConnections.join(', '));
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInterests(e.target.value);
    setProfile(prev => ({
      ...prev,
      interests: e.target.value.split(',').map(item => item.trim())
    }));
  };

  const handleConnectionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConnections(e.target.value);
    setProfile(prev => ({
      ...prev,
      commonConnections: e.target.value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onGenerateMessage(profile);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-slide-up">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Full Name"
            name="fullName"
            value={profile.fullName}
            onChange={handleProfileChange}
            required
          />
          <Input
            label="Position"
            name="position"
            value={profile.position}
            onChange={handleProfileChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Company"
            name="company"
            value={profile.company}
            onChange={handleProfileChange}
            required
          />
          <Input
            label="Industry"
            name="industry"
            value={profile.industry}
            onChange={handleProfileChange}
            required
          />
        </div>

        <TextArea
          label="Common Connections (comma separated)"
          name="commonConnections"
          value={connections}
          onChange={handleConnectionsChange}
          rows={2}
        />

        <TextArea
          label="Professional Interests (comma separated)"
          name="interests"
          value={interests}
          onChange={handleInterestsChange}
          rows={2}
        />

        <div className="flex justify-end pt-5">
          <Button
            type="submit"
            variant="primary"
            isLoading={isGenerating}
            icon={!isGenerating ? <RefreshCw className="h-4 w-4" /> : undefined}
          >
            Generate Message
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LinkedInForm;