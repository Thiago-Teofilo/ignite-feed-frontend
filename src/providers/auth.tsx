import { createContext, useEffect, useState } from "react";
import { IUser } from "../api/models/user";
import { getSession } from "../api/auth";

interface AuthContextProps {
    user: IUser | null;
    token: string | null;
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {    
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token") ?? null
    );

    const [user, setUser] = useState<IUser | null>(null);


    useEffect(() => {    
        async function reloadUser() {
          const session = await getSession()
          
          if (session) {
            setUser(session.user)
          }
        }
    
        reloadUser()
      }, []) 
    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}