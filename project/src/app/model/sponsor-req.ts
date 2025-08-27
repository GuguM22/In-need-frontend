import { User } from "./user";

export interface SponsorRequest {
  id?: string;
  title: string;
  priority: string;
  quantity: number;
  requiredDate: string; // or Date, depending on how you handle dates
  createdAt: string; 
  description: string;
  location: string;
  mediaUrls?: File[]; // for upload, it's File[]; for received data, maybe string[] URLs
  user?: User;
}