export interface UserInfoDTO {
    id: number;
    email: string;
    username: string;
    role: 'ADMIN' | 'INDIVIDUAL' | 'SPONSORS' | 'ORGANIZATION';
    verified: boolean;
  }
  