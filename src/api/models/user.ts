export interface IUser {
    id: string;
    avatarUrl?: string | null;
    bannerUrl?: string | null;
    email: string;
    name: string;
    role: string;
}