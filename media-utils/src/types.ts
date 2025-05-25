export interface User {
  id: string;
  email: string;
}
export default interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
}
