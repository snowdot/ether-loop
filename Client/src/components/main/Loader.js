import "./Loader.css";
import LogoImg from "../../assets/logo.png";

export default function Loader() {
    return (
        <div className="loader">
            <img src={LogoImg} alt="logo"></img>
        </div>
    );
}
