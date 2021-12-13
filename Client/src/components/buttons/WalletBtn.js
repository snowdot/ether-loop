import { useState } from "react";
import "./WalletBtn.css";
import { trimAddress } from "../../helpers/functions";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import LogoutBtn from "./LogoutBtn";
import udIcon from "../../assets/default-icon.png";

export default function WalletBtn({ user, handleLogout }) {
    const [showButton, setShowButton] = useState(false);

    const handleOnMouseEnter = () => {
        setShowButton(true);
    }

    const handleOnMouseLeave = () => {
        setShowButton(false);
    }

    return (
        <div
            className={`wallet-btn ${showButton ? "active" : ""}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <button className="wallet-btn__address">
                {
                    user.split("").indexOf(".") !== -1 &&
                    <img src={udIcon} alt=""></img>
                }
                {trimAddress(user)}
                {
                    !showButton &&
                    <ArrowDown color="var(--purple)" />
                }
                {
                    showButton &&
                    <ArrowUp color="var(--purple)" />
                }
            </button>
            {
                showButton &&
                <LogoutBtn handleLogout={handleLogout}/>
            }
        </div>
    );
}
