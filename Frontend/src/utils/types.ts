export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  platform: 'linkedin' | 'email' | 'facebook' | 'twitter';
  goal: string;
  budget: number;
  startDate: string;
  endDate: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    CTR: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LinkedInProfile {
  fullName: string;
  position: string;
  company: string;
  industry: string;
  commonConnections: string[];
  interests: string[];
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  current: boolean;
}

export interface Metric {
  name: string;
  value: number | string;
  change: number;
  changeType: 'increase' | 'decrease';
}