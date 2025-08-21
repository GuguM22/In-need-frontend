import { DonationFrequency } from "../constant/donation-frequency";
import { DonationType } from "../constant/donation-type";
import { LogisticPreference } from "../constant/logistic-peference";

export interface DonationRequestDTO {
  id?: number; 
  description: string;
  quantity: number;
  availability: string;
  additionalNotes: string;
  preference: LogisticPreference;
  type: DonationType;
  frequency: DonationFrequency;
  donorEmail: string;
  createdAt: Date;
  profileImagePath?: string;
  donorName: string;
}
