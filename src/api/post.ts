import { get, post } from "./_server";
import { IPost } from "./models/Post";

interface IPostRequest {
    page: number;
    limit: number;
}

interface ICreatePostRequest {
    content: string;
}

export async function getRecentPosts(page: number = 1): Promise<IPost[] | void> {
    return await get<IPostRequest, IPost[]>("post", {
        page,
        limit: 10
    })
}

export async function createPost(body: ICreatePostRequest) {
    return await post<ICreatePostRequest, void>({
        path: "post",
        body
    })
}