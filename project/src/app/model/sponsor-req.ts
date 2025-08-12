export interface SponsorRequest {
  title: string;
  priority: string;
  quantity: number;
  requiredDate: string; // or Date, depending on how you handle dates
  description: string;
  media?: File[]; // for upload, it's File[]; for received data, maybe string[] URLs
}