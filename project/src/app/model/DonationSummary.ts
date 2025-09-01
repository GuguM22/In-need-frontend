interface DonationSummary {
  id: number;
  description?: string;
  quantity?: number;
  availability?: string;
  additionalNotes?: string;
  preference?: any;  // put actual type like LogisticPreference
  type?: any;        // DonationType
  frequency?: any;   // DonationFrequency
  donorEmail?: string;
  createdAt?: Date;
  profileImageUrl?: string;
  donorName?: string;
  donorRole?: any;   // Role
  status?: any;      // DonationStatus
  sponsorRequestId?: number;
  isReceived?: boolean;
}
