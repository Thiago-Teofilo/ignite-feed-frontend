import { IUser } from "../api/models/user";

export function getCurrentUser() {
    const rawUser = localStorage.getItem("user")

    if (rawUser) {
        const user: IUser = JSON.parse(rawUser) as IUser;
        return user
    }
    return null
} 