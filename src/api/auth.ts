import { post } from "./_server";
import { IUser } from "./models/user";

export interface IAuthRegisterRequest {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface IAuthRegisterAndLoginResponse {
    token: string;
    user: IUser
}

export interface IAuthLoginRequest {
    email: string;
    password: string;
}


export async function getSession() {
    return await post<undefined, IAuthRegisterAndLoginResponse>({
        path: "auth/session",
        body: undefined,
        showToast: false
    })
}

export async function registerUser(body: IAuthRegisterRequest) {
    return await post<IAuthRegisterRequest, IAuthRegisterAndLoginResponse>({
        path: "auth/register",
        body,
    })
}

export async function login(body: IAuthLoginRequest) {
    return await post<IAuthLoginRequest, IAuthRegisterAndLoginResponse>({
        path: "auth",
        body
    })
}