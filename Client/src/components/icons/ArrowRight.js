export default function ArrowRight({color}) {
    const strokeColor = color ? color : "var(--lightgray)";

    return (
        <svg fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M9 18L15 12L9 6"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
