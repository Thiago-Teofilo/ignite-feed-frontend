import Skeleton, { SkeletonProps, SkeletonTheme } from "react-loading-skeleton";

export function BaseSkeleton(props: SkeletonProps) {
    return (
        <SkeletonTheme baseColor="var(--gray-700)" highlightColor="var(--gray-600)">
            <Skeleton {...props} customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)" />               
        </SkeletonTheme>
    )
}