export default interface AuthContextType {
  currentUser: any;
  userRole: string | null;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  googleLogin: () => Promise<any>;
  logout: () => Promise<void>;
}
