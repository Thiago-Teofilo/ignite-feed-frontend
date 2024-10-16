import styles from "./Profile.module.css"

import fallbackPersonImage from "../assets/images/fallback-person.png"
import fallbackLandscapeImage from "../assets/images/landscape-fallback.png"
import { Avatar } from "../components/Avatar"
import { useParams } from "react-router-dom"
import { getProfile } from "../api/user"
import { useEffect, useState } from "react"
import { IUser } from "../api/models/user"
import { IPost } from "../api/models/Post"
import { Post } from "../components/Post"

export function Profile() {
    const { id: userId } = useParams<{ id: string }>()
    const [user, setUser] = useState<IUser | null>(null)
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        async function loadProfile() {
            if (userId) {
                const response = await getProfile(userId)
    
                if (response) {
                    setUser(response.user)

                    setPosts(response.posts.map(post => ({
                        ...post,
                        publishedAt: new Date(post.publishedAt)
                    })))
                }
            }
        }
    
        loadProfile()
      }, [userId]) 

    return (
        <div className={styles.me}>
            <div className={styles['user-data']}>
                <img className={styles.cover} src={user?.bannerUrl ?? fallbackLandscapeImage} />
                <div className={styles["profile-avatar"]}>
                    <Avatar src={user?.avatarUrl ?? fallbackPersonImage} />
                </div>
                <div>
                    <h1>{user?.name}</h1>
                    <p>{user?.role}</p>
                </div>
            </div>
            <div>
            {posts.map(post => {
                return (
                <Post
                    key={post.id}
                    post={post}
                />
                )
            })}
            </div>
        </div>
    )
}