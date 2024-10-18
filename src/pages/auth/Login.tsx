import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import styles from "./Login.module.css"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { login } from "../../api/auth"
import { useAuth } from "../../composables/use-auth.tsx"

export function Login() {
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    })

    const { setUser, setToken } = useAuth();

    const navigate = useNavigate()

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        if (Object.values(loginValues).filter(value => value === "").length) {
            toast.error("Faltam dados a ser preenchidos")
        }  else {
            const loginResponse = await login({
                password: loginValues.password!,
                email: loginValues.email!,
            })

            if (loginResponse) {
                localStorage.setItem("token", loginResponse.token)
                
                setToken(loginResponse.token);
                setUser(loginResponse.user);
                navigate("/")
            }
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target

        setLoginValues((prevState) => {
            const updatedValues = {
                ...prevState,
                [name]: value,
            };

            return updatedValues;
        });
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.fields}>
                    <Input onChange={handleChange} name="email" label="E-mail" />
                    <Input onChange={handleChange} name="password" label="Senha" type="password" />
                </div>
                <Button type="submit" text="Fazer Login" />
            </form>
            <p>Não possui uma conta? <Link to="/cadastro">Crie uma nova</Link></p>
        </div>       
    )
}