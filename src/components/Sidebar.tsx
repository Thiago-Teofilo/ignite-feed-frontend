import { PencilLine } from 'phosphor-react'
import styles from './Sidebar.module.css'
import { Avatar } from './Avatar'
import { IUser } from '../api/models/user'

import { getCurrentUser } from '../utils/user'

import fallbackPersonImage from "../assets/images/fallback-person.png"
import fallbackLandscapeImage from "../assets/images/landscape-fallback.png"

const user: IUser = getCurrentUser()!;

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src={user.bannerUrl ?? fallbackLandscapeImage} />
            
            <div className={styles.profile}>
                <Avatar linkTo={`/profile/${user.id}`} src={user.avatarUrl ?? fallbackPersonImage} /> 

                <strong>{user.name}</strong>
                <span>{user.role}</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}