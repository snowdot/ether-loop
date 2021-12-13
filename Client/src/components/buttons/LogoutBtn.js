import "./LogoutBtn.css";

export default function LogoutBtn({ value, handleLogout }) {
    const handleOnClick = e => {
        handleLogout(e.currentTarget.value);
    }

    return (
        <button
            className="logout-button"
            onClick={handleOnClick}
            value={value}
        >
            Logout
        </button>
    );
}
