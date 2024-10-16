import { get } from "./_server";
import { IPost } from "./models/Post";
import { IUser } from "./models/user";

interface IGetProfileResponse {
    user: IUser;
    posts: IPost[]
}

export async function getProfile(userId: string) {
    return await get<undefined, IGetProfileResponse>(`user/${userId}`)
}