import { Role } from '../constant/role';


export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
}
