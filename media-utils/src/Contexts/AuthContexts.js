var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const AuthContext = createContext({
    user: null,
    role: null,
    loading: true,
});
export const AuthProvider = ({ children, }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
            setUser(currentUser);
            if (currentUser) {
                const db = getFirestore();
                const userDoc = yield getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    console.log("User role:", userDoc.data().role);
                    setRole(userDoc.data().role || "user");
                }
            }
            else {
                setRole(null);
            }
            setLoading(false);
        }));
        return () => unsubscribe();
    }, []);
    return (React.createElement(AuthContext.Provider, { value: { user, role, loading } }, children));
};
export const useAuth = () => useContext(AuthContext);
