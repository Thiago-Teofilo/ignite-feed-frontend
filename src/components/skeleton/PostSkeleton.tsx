import { SkeletonTheme } from "react-loading-skeleton";
import styles from "./PostSkeleton.module.css"
import { BaseSkeleton } from "./BaseSkeleton";

export function PostSkeleton() {
    return (
        <article className={styles.skeleton}>
            <div>
            <SkeletonTheme baseColor="var(--gray-700)" highlightColor="var(--gray-600)">
                <div className={styles["user-info"]}>
                <div className={styles["avatar-skeleton"]}></div>
                <BaseSkeleton count={2} />               
                </div>
                <BaseSkeleton count={3} />               
            </SkeletonTheme>
            </div>
        </article>
    )
}