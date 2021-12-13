import "./Navbar.css";
import { ROUTES } from "../../helpers/constants";
import { getCurPath } from "../../helpers/functions";
import PersonIcon from "../icons/PersonIcon";
import NavBtn from "../buttons/NavBtn";
import Logo from "./Logo";

export default function Navbar({ setShowModal }) {

    const handleOnClick = () => setShowModal(true);

    return (
        <nav className="navbar">
            <Logo />
            <div className="navbar__links">
                {
                    ROUTES.map(route => (
                        <NavBtn
                            key={route.id}
                            route={route}
                            active={getCurPath() === route.path}
                        />
                    ))
                }
            </div>
            <div
                className="navbar__links__connect"
                onClick={handleOnClick}
            >
                <div>Connect</div>
                <div><PersonIcon color="var(--white)"/></div>
            </div>
        </nav>
    );
}
