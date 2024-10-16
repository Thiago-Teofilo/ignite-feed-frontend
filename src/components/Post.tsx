import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import styles from "./Post.module.css"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { IPost } from "../api/models/Post"
import { formatToContent } from "../utils/string"
import { Button } from "./Button"

import fallbackPersonImage from "../assets/images/fallback-person.png"
import { createComment, deleteComment } from "../api/comment"

interface PostProps {
    post: IPost
}

export function Post({ post }: PostProps) {
    const [comments, setComments] = useState(post.comments)

    const [newCommentText, setNewCommentText] = useState('')
    
    const formattedContent = formatToContent(post.content)

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        
        createComment({
            content: newCommentText,
            postId: post.id
        }).then(comment => {
            if (comment) {
                setComments(state => ([comment, ...state]))
            }
        })
        setNewCommentText("")
    }   

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório")
    }

    async function handleDeleteComment(commentId: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment.id !== commentId
        })

        await deleteComment({
            commentId
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar linkTo={`/profile/${post.author.id}`} src={post.author.avatarUrl ?? fallbackPersonImage} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: formattedContent }}
            />

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <Button type="submit" text="Publicar" disabled={isNewCommentEmpty} />
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment.id} 
                            comment={comment}
                            onDeleteComment={handleDeleteComment} 
                        />
                    )
                })}
            </div>
        </article>
    ) 
}