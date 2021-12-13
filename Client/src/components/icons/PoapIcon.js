export default function PoapIcon({ color }) {
    const strokeColor = color ? color : "var(--lightgray)";

    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_2)">
                <path
                    d="M12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5C5 12.366 8.13401 15.5 12 15.5Z"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.21 14.39L7 23.5L12 20.5L17 23.5L15.79 14.38"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_1_2">
                    <rect width="24" height="24" fill="transparent" transform="translate(0 0.5)"/>
                </clipPath>
            </defs>
        </svg>
    );
}
