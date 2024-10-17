import { del, post } from "./_server";
import { IComment } from "./models/Comment";

interface IPostCommentRequest {
    content: string;
    postId: string;
}

interface ILikeComment {
    commentId: string
}

interface IDeleteComment {
    commentId: string
}


export async function createComment(body: IPostCommentRequest) {
    return await post<IPostCommentRequest, IComment>({
        path: "comment",
        body
    })
}

export async function likeComment(body: ILikeComment) {
    return await post<ILikeComment, void>({
        path: "comment/like",
        body
    })
}

export async function unlikeComment(body: ILikeComment) {
    return await del<ILikeComment, void>("comment/like", body)
}

export async function deleteComment(body: IDeleteComment) {
    return await del<IDeleteComment, void>("comment", body)
}