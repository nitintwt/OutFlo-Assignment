import { Campaign, LinkedInProfile, Metric, SidebarItem } from "./types"

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q2 Product Launch',
    description: 'Campaign for launching our new AI-powered analytics dashboard',
    status: 'active',
    platform: 'linkedin',
    goal: 'Increase product awareness',
    budget: 5000,
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    metrics: {
      impressions: 15428,
      clicks: 3271,
      conversions: 546,
      CTR: 21.2,
    },
    createdAt: '2025-03-15T09:24:00Z',
    updatedAt: '2025-04-02T14:30:00Z',
  },
  {
    id: '2',
    name: 'Summer Webinar Series',
    description: 'Promotional campaign for our upcoming expert webinar series',
    status: 'active',
    platform: 'email',
    goal: 'Drive webinar registrations',
    budget: 3000,
    startDate: '2025-05-15',
    endDate: '2025-08-15',
    metrics: {
      impressions: 8762,
      clicks: 1243,
      conversions: 328,
      CTR: 14.2,
    },
    createdAt: '2025-04-20T11:15:00Z',
    updatedAt: '2025-05-16T08:45:00Z',
  },
  {
    id: '3',
    name: 'Enterprise Lead Generation',
    description: 'Targeted campaign to generate enterprise-level leads',
    status: 'inactive',
    platform: 'linkedin',
    goal: 'Generate qualified enterprise leads',
    budget: 12000,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    metrics: {
      impressions: 24653,
      clicks: 4892,
      conversions: 842,
      CTR: 19.8,
    },
    createdAt: '2024-12-10T16:00:00Z',
    updatedAt: '2025-04-01T10:20:00Z',
  },
  {
    id: '4',
    name: 'Customer Retention Program',
    description: 'Re-engagement campaign targeting dormant customers',
    status: 'inactive',
    platform: 'email',
    goal: 'Increase customer retention',
    budget: 4500,
    startDate: '2025-02-01',
    endDate: '2025-04-30',
    metrics: {
      impressions: 12345,
      clicks: 2468,
      conversions: 412,
      CTR: 20.0,
    },
    createdAt: '2025-01-15T14:30:00Z',
    updatedAt: '2025-05-01T09:15:00Z',
  },
  {
    id: '5',
    name: 'Product Feature Spotlight',
    description: 'Highlight new features added in the latest product update',
    status: 'active',
    platform: 'twitter',
    goal: 'Increase feature adoption',
    budget: 2000,
    startDate: '2025-04-15',
    endDate: '2025-05-15',
    metrics: {
      impressions: 7851,
      clicks: 1632,
      conversions: 284,
      CTR: 20.8,
    },
    createdAt: '2025-04-01T08:45:00Z',
    updatedAt: '2025-04-16T13:20:00Z',
  },
];

export const mockLinkedInProfile: LinkedInProfile = {
  fullName: 'Sarah Johnson',
  position: 'Senior Marketing Director',
  company: 'TechCorp Solutions',
  industry: 'Software & Technology',
  commonConnections: ['David Chen', 'Maria Rodriguez', 'Alex Taylor'],
  interests: ['Digital Marketing', 'Marketing Analytics', 'Lead Generation'],
};

export const mockMessage = 
`Hi Sarah,

I noticed we share connections with David Chen and Maria Rodriguez. I've been following TechCorp's innovative approach to cloud solutions and was particularly impressed with your recent product launch.

Given your interest in Marketing Analytics, I thought you might find our new AI-powered campaign analysis tool valuable for your team at TechCorp. It's specifically designed for marketing directors looking to enhance their data-driven decision making.

Would you be open to a quick 15-minute call next week to discuss how our solution might support your marketing initiatives?

Best regards,
[Your Name]`;

export const sidebarNavigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard', current: true },
  { name: 'Campaigns', href: '/campaigns', icon: 'BarChart3', current: false },
  { name: 'LinkedIn Generator', href: '/linkedin-generator', icon: 'MessageSquare', current: false },
  { name: 'Analytics', href: '/analytics', icon: 'PieChart', current: false },
  { name: 'Settings', href: '/settings', icon: 'Settings', current: false },
];

export const dashboardMetrics: Metric[] = [
  { 
    name: 'Total Campaigns', 
    value: 5, 
    change: 25, 
    changeType: 'increase' 
  },
  { 
    name: 'Active Campaigns', 
    value: 3, 
    change: 10, 
    changeType: 'increase' 
  },
  { 
    name: 'Total Budget', 
    value: '$26,500', 
    change: 12, 
    changeType: 'increase' 
  },
  { 
    name: 'Avg. Conversion Rate', 
    value: '19.2%', 
    change: 3.5, 
    changeType: 'increase' 
  },
];

export const platformDistribution = [
  { name: 'LinkedIn', value: 40 },
  { name: 'Email', value: 35 },
  { name: 'Twitter', value: 15 },
  { name: 'Facebook', value: 10 },
];