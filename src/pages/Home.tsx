import { Post } from "../components/Post"
import { Sidebar } from "../components/Sidebar"

import styles from './Home.module.css'

import { IPost } from "../api/models/Post"

export const author = {
  avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHloTv6jOq3gA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722442298115?e=1731542400&v=beta&t=y8qngHvMTI2LmQgVG8-eeYqJXhJiMxpAOb_d3qyTPHM',
  name: 'Thiago Teofilo',
  role: 'Web Developer'
}

const posts: IPost[] = [
  {
    id: 1,
    author,
    content: `
      Fala galeraa 👋
      
      Acabei de subir mais um projeto no meu portifa.
      
      É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
      
      https://jane.design/doctorcare
      #novoprojeto #nlw #rocketseat
    `,
    publishedAt: new Date('2024-05-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGEHMLnYkdbqQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712266222774?e=1732147200&v=beta&t=RGYWex4lRhkndhxZelql6F63HFITL2i64gVtEzyn0nA',
      name: 'Renato Junior',
      role: 'Desenvolvedor Backend Sênior'
    },
    content: `
      Bom dia,
      
      meu nome é Renato. Estou muito animado para aprender sobre a área de programação pois ainda não sei nada, estou cursando 3D do Blender pela Udemy que é outra área que eu gosto demais, pois gosto muito de arte. Tenho conhecimento básico de Photoshop, informática estou disposto a ajudar naquilo em que precisarem, podem contar comigo. 🚀
      
      #nlw #rocketseat
    `,
    publishedAt: new Date('2024-08-10 20:00:00')
  },
]

export function Home() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
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
