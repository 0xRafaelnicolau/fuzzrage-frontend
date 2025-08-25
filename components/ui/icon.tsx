import { cn } from "@/lib/utils";

interface IconProps {
    className?: string;
    size?: number;
}

export function Icon({ className, size = 56 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 1280 1280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-foreground", className)}
        >
            <mask id="mask0_24_487" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="1280">
                <rect width="1280" height="1280" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_24_487)">
                <path
                    d="M673.456 621C665.395 616.547 653.094 612.713 639.5 612.604C625.906 612.713 613.605 616.547 605.544 621C557.981 646.797 477.972 721.325 453.315 806.001C443.304 850.645 403.477 884 355.87 884C300.713 884 256 839.228 256 784C256 737.641 287.505 698.65 330.245 687.322C393.537 665.821 489.069 607.461 537.643 489.76C539.575 484.977 540.878 480.619 541.818 477.087C551.42 431.898 591.507 398 639.5 398C687.392 398 727.41 431.754 737.121 476.8V476.8C738.827 482.823 745.276 499.037 747.921 504.711C798.14 612.444 888.203 666.751 948.755 687.322C991.495 698.65 1023 737.641 1023 784C1023 839.228 978.287 884 923.13 884C875.523 884 835.696 850.645 825.685 806.001C801.028 721.325 721.019 646.797 673.456 621Z"
                    fill="currentColor"
                />
            </g>
        </svg>
    );
}
