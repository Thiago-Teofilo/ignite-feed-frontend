import { createContext, useEffect, useState } from "react";
import { IUser } from "../api/models/user";
import { getSession } from "../api/auth";

interface AuthContextProps {
    user: IUser | null;
    token: string | null;
    isLoading: boolean;
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {    
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token") ?? null
    );

    const [user, setUser] = useState<IUser | null>(null);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {    
        async function reloadUser() {
          if (localStorage.getItem("token") || token) {
            const session = await getSession()
            if (session) {
              setUser(session.user)
            } else {
              localStorage.removeItem("token")
            }
          } else {
            setUser(null)
          }
          setIsLoading(false)
        }
        reloadUser()
      }, []) 
    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}