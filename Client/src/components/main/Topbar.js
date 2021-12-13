import "./Topbar.css";
import WalletBtn from "../buttons/WalletBtn";

export default function Topbar({ title, user, handleLogout }) {
    return (
        <div className="topbar">
            <h3>{title}</h3>
            <div>
                <WalletBtn 
                    user={user}
                    handleLogout={handleLogout}
                />
            </div>
        </div>
    );
}
