export default function ArrowUp({ color }) {
    const strokeColor = color ? color : "var(--lightgray)";

    return (
        <svg className="icon" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M18 15L12 9L6 15"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
