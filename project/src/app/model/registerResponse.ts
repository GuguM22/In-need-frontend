import { Role } from '../constant/role';    

export interface RegisterResponse {

    username: string;
    email: string;
    role:  Role.SPONSORS| Role.ORGANIZATION | Role.INDIVIDUAL;
    password: string;
    confirmPassword: string;
    
    }