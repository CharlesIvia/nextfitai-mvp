// providers/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import nookies from "nookies";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        setUser(user);

        // Get the token and set it in cookies
        const token = await user.getIdToken();
        nookies.set(undefined, "auth-token", token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
      } else {
        // User is signed out
        setUser(null);
        nookies.destroy(undefined, "auth-token");

        // Redirect to sign-in if trying to access protected route
        if (pathname?.startsWith("/dashboard")) {
          router.push("/get-started");
        }
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [pathname, router]);

  // Refresh token periodically
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        nookies.set(undefined, "auth-token", token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
