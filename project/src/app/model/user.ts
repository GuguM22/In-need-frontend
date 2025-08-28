import { Role } from '../constant/role';


export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  role: Role;
  profileImageUrl?: string;
  verified: boolean;
 }



