import { DonationFrequency } from "../constant/donation-frequency";
import { DonationType } from "../constant/donation-type";
import { LogisticPreference } from "../constant/logistic-peference";

export interface Donation {
  id: number;
  description: string;
  type: DonationType;
  frequency: DonationFrequency;
  quantity: number;
  availability: string;
  logisticPreference: LogisticPreference;
  createdAt: Date;
  donorEmail: string;
}  