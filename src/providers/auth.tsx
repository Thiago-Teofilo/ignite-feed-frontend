import { createContext, useState } from "react";
import { IUser } from "../api/models/user";

interface AuthContextProps {
    user: IUser | null;
    token: string | null;
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const rawUser = localStorage.getItem("user")

    const [user, setUser] = useState<IUser | null>(
        rawUser ? 
        JSON.parse(rawUser) as IUser
        : null
    );

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token") ?? null
    );

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}