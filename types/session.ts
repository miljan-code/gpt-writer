export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string;
  createdAt: number;
  credits: number;
  passwordEnabled: boolean;
}
