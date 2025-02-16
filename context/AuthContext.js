"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { auth, initClientFirebase } from "../utils/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize client-side Firebase services
    initClientFirebase();
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      try {
        if (status === "authenticated") {
          setUser({ ...session.user, ...firebaseUser });
          setLoading(false);
        } else if (status === "unauthenticated") {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Authentication error:", err);
      }
    });

    return () => unsubscribe();
  }, [session, status]);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: status === "authenticated",
    signInWithEmail: (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    signOut: () => {
      return signOut(auth);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
