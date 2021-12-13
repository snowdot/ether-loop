import "./Error.css";

export default function Error({ message }) {
    return (
        <div className="error">
            <div>
                <span>Error!</span>
            </div>
            <div>{message}</div>
        </div>
    );
}
