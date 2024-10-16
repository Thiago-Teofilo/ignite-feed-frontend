import styles from './Header.module.css'

import IgniteLogo from '../assets/ignite-logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <header className={styles.header}>
            <NavLink to="/" title="feed">
                <img src={IgniteLogo} alt="logotipo do ignite" />
            </NavLink>
        </header>
    )
}