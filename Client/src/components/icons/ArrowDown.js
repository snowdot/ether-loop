export default function ArrowDown({ color }) {
    const strokeColor = color ? color : "var(--lightgray)";

    return (
        <svg className="icon" fill="none" width="24" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
            <path
                d="M6 9.5L12 15.5L18 9.5"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
