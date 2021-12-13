import "./LoginBtn.css";
import udIcon from "../../assets/default-icon.png";
import mmIcon from "../../assets/metamask-logo.png";

export default function LoginBtn({ value, label, handleLogin }) {
    const handleOnClick = e => {
        handleLogin(e.currentTarget.value);
    }

    return (
        <button
            className="login-button"
            onClick={handleOnClick}
            value={value}
        >
            {
                value === "ud" &&
                <img src={udIcon} alt="ud icon"></img>
            }            
            {
                value === "mm" &&
                <img src={mmIcon} alt="mm icon"></img>
            }
            {label}     
        </button>
    );
}
