import React, { useState, useEffect } from "react";
import UAuth from "@uauth/js";

const uauth = new UAuth({
    clientID: process.env.REACT_APP_UD_CLIENT_ID,
    clientSecret: process.env.REACT_APP_UD_CLIENT_SECRET,
    scope: process.env.REACT_APP_UD_SCOPE,
    redirectUri: process.env.REACT_APP_UD_REDIRECT_URI,
});

export const AuthContext = React.createContext();
AuthContext.displayName = "AuthProvider";

export default function AuthProvider({ children }) {
    const [address, setAddress] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        uauth
            .user()
            .then(res => {
                setUser(res.sub);
                setAddress(res.wallet_address);
        })
        .catch(err => console.error(err.message));
    }, []);

    const handleLogin = async (value) => {
        if(value === "ud") {
            uauth
                .loginWithPopup()
                .then(res => {
                    setUser(res.idToken.sub);
                    setAddress(res.idToken.wallet_address);
                })
                .catch(err => console.error(err.message));
        }

        if(value === "mm") {
            if (window.ethereum) {
                try {
                    const res = await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    });
                    setUser(res[0]);
                    setAddress(res[0]);
                } catch (error) {
                    alert("Something went wrong. Please try again!");
                }
            } else {
                alert("Please install the MetaMask extension!");
            }
        }
    }

    const handleLogout = async () => {
        uauth
        .logout()
        .catch(err => console.error(err.message))
        .finally(() => {
            setAddress(null);
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider
            value={{
                address: address,
                user: user,
                handleLogin: handleLogin,
                handleLogout: handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
