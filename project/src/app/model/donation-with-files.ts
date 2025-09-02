import { Donation } from "./donation";

export interface DonationWithFiles extends Donation {
    selectedFiles?: FileList | null;
  }