import { get, patch } from "./_server";
import { IPost } from "./models/Post";
import { IUser } from "./models/user";

interface IGetProfileResponse {
    user: IUser;
    posts: IPost[]
}

interface IUpdateUserRequest {
    avatarUrl?: string;
    bannerUrl?: string;
}

export async function getProfile(userId: string) {
    return await get<undefined, IGetProfileResponse>(`user/${userId}`)
}

export async function updateUser(body: IUpdateUserRequest) {
    return await patch<IUpdateUserRequest, void>({
        path: "user",
        body,
    })
}