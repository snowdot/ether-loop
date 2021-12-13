import "./NavBtn.css";
import { Link } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import SocialIcon from "../icons/SocialIcon";
import NftIcon from "../icons/NftIcon";
import PoapIcon from "../icons/PoapIcon";
import LedgerIcon from "../icons/LedgerIcon";

export default function NavBtn({
    route,
    active
}) {
    const { path, label } = route;

    const getIcon = () => {
        if(path === "/home") return <HomeIcon />
        if(path === "/social") return <SocialIcon />
        if(path === "/nfts") return <NftIcon />
        if(path === "/poaps") return <PoapIcon />
        if(path === "/ledger") return <LedgerIcon />
    }

    return (
        <Link
            to={path}
            className={`
                nav-btn
                ${active ? "active" : ""}
            `}
        >
            {getIcon(path)}
            {label}
            <div>{label}</div>
        </Link>
    );
}
