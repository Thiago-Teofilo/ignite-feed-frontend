import { ThumbsUp, Trash } from "phosphor-react"
import styles from "./Comment.module.css"
import { Avatar } from "./Avatar"
import { useState } from "react"
import { formatToContent } from "../utils/string";
import { IComment } from "../api/models/Comment";

import fallbackPersonImage from "../assets/images/fallback-person.png"
import { likeComment, unlikeComment } from "../api/comment";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../composables/use-auth.tsx";
import { toast } from "react-toastify";

interface CommentProps {
    comment: IComment;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ comment, onDeleteComment }: CommentProps) {
    const auth = useAuth()

    const [likeCount, setLikeCount] = useState(comment.likes ? comment.likes.length : 0)
    const [wasLiked, setWasLiked] = useState(comment.likes ? !!comment.likes.find((like) => like.userId === auth.user?.id) : false)


    function handleDeleteComment() {
        onDeleteComment(comment.id)
    }

    async function handleLikeComment() {
        if (auth.user) {
            if (!wasLiked) {
                setLikeCount((state) => {
                    return state + 1
                })
                await likeComment({
                    commentId: comment.id,
                })
            } else {
                setLikeCount((state) => {
                    return state - 1
                })
                await unlikeComment({
                    commentId: comment.id,
                })
            }
            setWasLiked(!wasLiked)
        } else {
            toast.warn("Você precisa realizar o login")
        }
    }

    const publishedDate = new Date(comment.publishedAt)

    const formattedContent = formatToContent(comment.content)

    const publishedDateFormatted = format(publishedDate, "d 'de' LLLL 'ás' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedDate, {
        locale: ptBR,
        addSuffix: true
    })

    
    return (
        <div className={styles.comment}>
            <Avatar linkTo={`/profile/${comment.author.id}`} hasBorder={false} src={comment.author.avatarUrl ?? fallbackPersonImage} />
        
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{comment.author.name}</strong>
                            <time title={publishedDateFormatted} dateTime={publishedDate.toISOString()}>{publishedDateRelativeToNow}</time>
                        </div>
                        {
                            comment.author.id === auth.user?.id ? (
                                <button onClick={handleDeleteComment} title="Deletar comentário">
                                    <Trash size={24} />
                                </button>
                            ) : (<></>)
                        }
                    </header>

                    <div 
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />
            </div>

                <footer className={wasLiked ? styles.liked : ""}>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Curtir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}