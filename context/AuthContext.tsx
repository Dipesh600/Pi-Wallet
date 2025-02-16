"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session?.user || null);
      setLoading(false);
    } else if (status === "unauthenticated") {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: status === "authenticated"
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
