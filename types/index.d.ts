export interface User {
  userId: string;
  email: string;
  name: string | null;
  credits: number;
  image: string | null;
  createdAt: Date;
}
