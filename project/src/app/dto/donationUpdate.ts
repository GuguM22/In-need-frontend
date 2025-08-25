import { DonationStatus } from "../constant/donationStatus";

export interface DonationUpdate {
    id: number;
    status: DonationStatus;
}
  