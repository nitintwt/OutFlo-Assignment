import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Copy, Check } from 'lucide-react';
import { mockMessage } from '../../utils/mockData';

interface MessagePreviewProps {
  message?: string;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ 
  message = mockMessage
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Generated Message</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          icon={copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-gray-700">
        {message}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Tips:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Personalize further by mentioning specific projects or achievements</li>
          <li>Keep the message concise and focused on value</li>
          <li>End with a clear call-to-action</li>
        </ul>
      </div>
    </Card>
  );
};

export default MessagePreview;