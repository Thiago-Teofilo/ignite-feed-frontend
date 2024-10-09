import { PencilLine } from 'phosphor-react'
import styles from './Sidebar.module.css'
import { Avatar } from './Avatar'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            
            <div className={styles.profile}>
                <Avatar src="https://media.licdn.com/dms/image/v2/D4D03AQHloTv6jOq3gA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722442298115?e=1731542400&v=beta&t=y8qngHvMTI2LmQgVG8-eeYqJXhJiMxpAOb_d3qyTPHM" /> 

                <strong>Thiago Teofilo</strong>
                <span>Web Developer</span>
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