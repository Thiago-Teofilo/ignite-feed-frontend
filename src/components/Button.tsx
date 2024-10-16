import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    variant?: "primary" | "secondary"
}

export function Button({ text, variant="primary", ...buttonProps }: ButtonProps) {
    return (
        <div>
            <button className={`${styles.button} ${styles[variant]}`} {...buttonProps}>
                { text }
            </button>
        </div>
    )
}