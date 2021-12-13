import "./LandingPage.css";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN_OPTIONS } from "../../helpers/constants";
import Galaxy from "../main/Galaxy";
import LoginBtn from "../buttons/LoginBtn";

export default function LandingPage() {
    const authContext = useContext(AuthContext);

    if(authContext.address) {
        return <Navigate to="/home"/>
    }

    return (
        <main>
            <div className="landing-wrapper">
                <div className="landing-wrapper__right">
                    <h1>Be in the loop</h1>
                    <h2>Join Etherloop now</h2>
                    {
                        LOGIN_OPTIONS.map((elem, ind) => (
                            <LoginBtn
                                key={ind}
                                value={elem.value}
                                label={elem.label}
                                handleLogin={authContext.handleLogin}
                            />
                        ))
                    }
                </div>
                <div className="landing-wrapper__left">
                    <Galaxy />
                </div>
            </div>
        </main>
    );
}
