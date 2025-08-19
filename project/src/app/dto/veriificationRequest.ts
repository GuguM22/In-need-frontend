export interface Document {
    id: number;
    fileName: string;
  }

export interface VerificationRequest{
   id: number;
    phone: string;
    website: string;
    documents: string[];
    // documents: Document[];
    email: string;
    userId: string;
    verified?: boolean;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED'; 
    username: string;
}


export interface VerificationResponse {
    id?: number;
    phone: string;
    website: string;
    documents: string[];
    // documents: Document[];
    status: string;
    userEmail: string;  // for displaying in UI
    userId: string;
}
