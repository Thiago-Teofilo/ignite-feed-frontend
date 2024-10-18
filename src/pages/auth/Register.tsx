import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import styles from './Register.module.css'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../api/auth";
import { useAuth } from "../../composables/use-auth.tsx";

interface IRegisterValues {
    email?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
    name?: string | null;
    role?: string | null;
}

export function Register() {
    const { setUser, setToken } = useAuth();

    const [isInStepTwo, setIsInStepTwo] = useState(false)

    const navigate = useNavigate()

    const [registerValues, setRegisterValues] = useState<IRegisterValues>({
        email: null,
        password: null,
        confirmPassword: null,
        name: null,
        role: null
    })

    function handleStep() {
        if (!isInStepTwo && Object.values(registerValues).slice(0, 3).filter(value => !value).length) {
            toast.error("Faltam dados a ser preenchidos")
        } else if (!isInStepTwo && registerValues.password !== registerValues.confirmPassword) {
            toast.error("Senhas não coincidem")
        } else {
            setIsInStepTwo(!isInStepTwo)
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        if (!isInStepTwo) {
            return
        } else if (Object.values(registerValues).filter(value => !value).length) {
            toast.error("Faltam dados a ser preenchidos")
        } else {
            const registerResponse = await registerUser({
                name: registerValues.name!,
                password: registerValues.password!,
                email: registerValues.email!,
                role: registerValues.role!,
            })

            if (registerResponse) {
                localStorage.setItem("token", registerResponse.token)
                setToken(registerResponse.token);
                setUser(registerResponse.user);
                navigate("/")
            }
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setRegisterValues((prevState) => {
            const updatedValues = {
                ...prevState,
                [name]: value,
            };

            return updatedValues;
        });
    }

    // TODO integrar API da freeimage para hospedar imagens: https://freeimage.host/

    return (
        <div className={styles.register}>
            <h1>Cadastro</h1>
            <div className={styles.steps}>
                <div className={styles.active}>
                    <div>1</div>
                    <strong>Dados</strong>
                </div>
                <div className={isInStepTwo ? styles.active : ""}>
                    <div>2</div>
                    <strong>Sobre</strong>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
            { isInStepTwo ? (
                <div>
                    <div className={styles.fields}>
                        <Input value={registerValues.name ?? ""} name="name" onChange={handleChange} label="Nome" />
                        <Input value={registerValues.role ?? ""} name="role" onChange={handleChange} label="Cargo" />
                    </div>
                    <div className={styles.buttons}>
                        <Button type="button" variant="secondary" onClick={handleStep} text="Retornar" />
                        <Button text="Finalizar" />
                    </div>
                </div>
            ) : (
                <div>
                    <div className={styles.fields}>
                        <Input value={registerValues.email ?? ""} name="email" onChange={handleChange} label="E-mail" />
                        <Input value={registerValues.password ?? ""} name="password" onChange={handleChange} label="Senha" type="password" />
                        <Input value={registerValues.confirmPassword ?? ""} name="confirmPassword" onChange={handleChange} label="Confirmar Senha" type="password" />
                    </div>
                    <Button type="button" onClick={handleStep} text="Próximo" />
                </div>    
                ) 
            }
            </form>
            <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
        </div>
    )
}