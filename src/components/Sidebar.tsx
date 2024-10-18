import { PencilLine } from 'phosphor-react'
import styles from './Sidebar.module.css'
import { Avatar } from './Avatar'

import fallbackPersonImage from "../assets/images/fallback-person.png"
import fallbackLandscapeImage from "../assets/images/landscape-fallback.png"
import { useAuth } from '../composables/use-auth'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
    const { user } = useAuth()

    if (user) {
        return (
            <aside className={styles.sidebar}>
                <img className={styles.cover} src={user.bannerUrl ?? fallbackLandscapeImage} />
                
                <div className={styles.profile}>
                    <Avatar linkTo={`/profile/${user.id}`} src={user.avatarUrl ?? fallbackPersonImage} /> 
    
                    <strong>{user.name}</strong>
                    <span>{user.role}</span>
                </div>
    
                <footer>
                    <NavLink to={`profile/${user.id}`}>
                        <PencilLine size={20} />
                        Editar seu perfil
                    </NavLink>
                </footer>
            </aside>
        )
    } else {
        // TODO fazer com que seja possível carregar esta página sem estar logado
        return (
            <>Faça login</>
        )
    }
}