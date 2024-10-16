import { IAuthor } from "./Post";

export interface IComment {
    id: string;
    author: IAuthor;
    publishedAt: Date;
    content: string;
    likes: ICommentLike[]
}

export interface ICommentLike {
    id: string;
    userId: string
}