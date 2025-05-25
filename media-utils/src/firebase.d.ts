declare module "../../firebase.js" {
  import { Auth, UserCredential } from "firebase/auth";

  export const auth: Auth;
  export const googleProvider: any;
  export function signInWithEmailAndPassword(
    auth: Auth,
    email: string,
    password: string
  ): Promise<UserCredential>;
  export function signInWithPopup(
    auth: Auth,
    provider: any
  ): Promise<UserCredential>;
}

export {};
