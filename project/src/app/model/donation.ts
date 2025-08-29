import { DonationFrequency } from "../constant/donation-frequency";
import { DonationType } from "../constant/donation-type";
import { LogisticPreference } from "../constant/logistic-peference";
import { Role } from "../constant/role";

export interface Donation {
  id: number;
  description?: string;
  type?: DonationType;
  frequency?: DonationFrequency;
  quantity?: number;
  availability?: string;
  preference?: LogisticPreference;
  createdAt?: Date;
  donorEmail?: string;
  donorName?: string;       
  profileImageUrl?: string; 
  additionalNotes?: string;
  donorRole?: Role;
  status: string;
  sponsorRequestId?: number;
}  