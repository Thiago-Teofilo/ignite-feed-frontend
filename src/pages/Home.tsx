import { Post } from "../components/Post"
import { Sidebar } from "../components/Sidebar"

import styles from './Home.module.css'

import { IPost } from "../api/models/Post"
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react"
import { createPost, getRecentPosts } from "../api/post"
import { Button } from "../components/Button"

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [newPostText, setNewPostText] = useState("")

  async function handleCreateNewPost(event: FormEvent) {
    event.preventDefault()
    
    await createPost({
        content: newPostText,
    })
    await loadPosts()
    setNewPostText("")
  }   
  
  function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewPostText(event.target.value)
  }

  function handleNewPostInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório")
}

  async function loadPosts() {
    const rawPosts = await getRecentPosts()

    if (rawPosts) {
      const posts = rawPosts.map(post => ({
        ...post,
        publishedAt: new Date(post.publishedAt)
      }))
      setPosts(posts)
    }
  }

  useEffect(() => {
    loadPosts()
  }, []) 

  const isNewPostEmpty = newPostText.length === 0

  return (
    <div>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <div>
            <form onSubmit={handleCreateNewPost} className={styles.postForm}>
              <strong>Deixe uma nova publicação</strong>

              <textarea 
                  name="comment"
                  placeholder="Faça uma nova publicação"
                  value={newPostText}
                  onChange={handleNewPostChange}
                  onInvalid={handleNewPostInvalid}
                  required
              />
              <footer>
                <Button type="submit" text="Publicar" disabled={isNewPostEmpty} />
              </footer>
            </form>          
          </div>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
