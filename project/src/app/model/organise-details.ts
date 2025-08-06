interface Charity {
  id: number;
  name: string;
  location: string;
  avatarUrl: string;
  verified: boolean;
  urgency: 'HIGH_PRIORITY' | 'MEDIUM_PRIORITY' | 'LOW_PRIORITY';
  daysLeft: number;
  totalDays: number;
  campaignTitle: string;
  campaignDescription: string[];
  campaignGoal: string;
}

interface Donor {
  name: string;
  avatarUrl: string;
  type: string;
  deliveryDate: string;
  donationImages: string[];
}
