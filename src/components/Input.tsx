import styles from "./Input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function Input({ label, ...inputProps }: InputProps) {
    return (
        <div className={styles['input-root']}>
            {
                label ? (<label>{label}</label>) : null
            }
            <input type="text" {...inputProps}  />
        </div>
    )
}