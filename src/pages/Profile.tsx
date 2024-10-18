import styles from "./Profile.module.css"

import fallbackPersonImage from "../assets/images/fallback-person.png"
import fallbackLandscapeImage from "../assets/images/landscape-fallback.png"
import { Avatar } from "../components/Avatar"
import { useParams } from "react-router-dom"
import { getProfile, updateUser } from "../api/user"
import { useEffect, useState } from "react"
import { IUser } from "../api/models/user"
import { IPost } from "../api/models/Post"
import { Post } from "../components/Post"
import { PostSkeleton } from "../components/skeleton/PostSkeleton"
import { BaseSkeleton } from "../components/skeleton/BaseSkeleton"
import { AvatarSkeleton } from "../components/skeleton/AvatarSkeleton"
import ImageInput from "../components/ImageInput"
import { useAuth } from "../composables/use-auth"
import { getSession } from "../api/auth"

export function Profile() {
    const { id: userId } = useParams<{ id: string }>()
    const [user, setUser] = useState<IUser | null>(null)
    const [posts, setPosts] = useState<IPost[]>([])

    const { user: currentUserSession, setUser: setCurrentUser } = useAuth()

    const isCurrentUserProfile = currentUserSession?.id === userId

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
    
    useEffect(() => {
        loadProfile()
      }, [userId]) 

    function handleAvatarChange(base64Image: string) {
        setUser((state) => {
            if (state) {
                return {
                    ...state,
                    avatarUrl: base64Image
                }
            }
            return state
        })
        updateUser({
            avatarUrl: base64Image
        }).then(() => {
            getSession().then((response) => {
                if (response) {
                    setCurrentUser(response.user)
                    loadProfile()
                }
            })
        })
    }

    function handleCoverChange(base64Image: string) {
        setUser((state) => {
            if (state) {
                return {
                    ...state,
                    bannerUrl: base64Image
                }
            }
            return state
        })
        updateUser({
            bannerUrl: base64Image
        }).then(() => {
            getSession().then((response) => {
                if (response) {
                    setCurrentUser(response.user)
                }
            })
        })
    }

    return (
        <div className={styles.me}>
            {user ? (
                <div className={styles.userData}>
                    <div className={styles.cover}>
                        <img src={user?.bannerUrl ?? fallbackLandscapeImage} />
                        {
                            isCurrentUserProfile ? (
                                <ImageInput id="cover-input" className={styles.imageInput} onChangeImage={handleCoverChange} />
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className={styles.profileAvatar}>
                        <Avatar src={user?.avatarUrl ?? fallbackPersonImage} />
                        {
                            isCurrentUserProfile ? (
                                <ImageInput id="avatar-input" className={styles.imageInput} onChangeImage={handleAvatarChange} />
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div>
                        <h1>{user?.name}</h1>
                        <p>{user?.role}</p>
                    </div>
                </div>
            ) : (
                <div className={`${styles.userData} ${styles.skeleton}`}>
                    <div className={styles.cover}></div>
                    <div className={styles.profileAvatar}>
                        <AvatarSkeleton />
                    </div>
                    <div>
                        <BaseSkeleton className={styles.title} /> 
                        <BaseSkeleton />                             
                    </div>
                </div>
            )

            }
            <div>
            {user ? posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                    />
            )) : [1, 2, 3].map(index => (
                <PostSkeleton key={index} />
            ))
            } 
            </div>
        </div>
    )
}