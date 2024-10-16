import { ImgHTMLAttributes } from "react"
import styles from "./Avatar.module.css";
import { useNavigate } from "react-router-dom";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
    linkTo?: string
}

export function Avatar({ linkTo, hasBorder = true, ...props }: AvatarProps) {
    const navigate = useNavigate()

    function handleClick() {
        if (linkTo) {
            navigate(linkTo)
        }
    }

    const imageClasses = hasBorder ? [styles.avatarWithBorder] : [styles.avatar]
    
    if (linkTo) {
        imageClasses.push(styles.clickable)
    }

    return (
        <img 
            onClick={handleClick} className={imageClasses.join(" ")} 
            {...props}
        />
    )
} 