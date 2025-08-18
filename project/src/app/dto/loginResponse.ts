
export interface LoginResponse {
  token: string;
  role: 'SPONSORS' | 'ORGANIZATION' | 'INDIVIDUAL';
  email: string;
  verified: boolean;

}