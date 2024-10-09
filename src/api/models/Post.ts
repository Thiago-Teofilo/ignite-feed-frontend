export interface IAuthor {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface IPost {
    id: number;
    author: IAuthor;
    publishedAt: Date;
    content: string;
}
