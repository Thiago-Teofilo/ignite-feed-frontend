import { Input } from "../../components/Input";

import styles from './Register.module.css'

export function Register() {
    return (
        <div className={styles.register}>
            <h1>Cadastro</h1>
            <form>
                <div className={styles.fields}>
                    <Input label="Nome" />
                    <Input label="Email" />
                    <Input label="Senha" />
                    <Input label="Confirmar Senha" />
                </div>
            </form>
        </div>
    )
}