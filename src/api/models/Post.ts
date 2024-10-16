import { IComment } from "./Comment";

export interface IAuthor {
    id: string;
    name: string;
    role: string;
    avatarUrl: string | null;
}

export interface IPost {
    id: string;
    author: IAuthor;
    publishedAt: Date;
    content: string;
    comments: IComment[]
}