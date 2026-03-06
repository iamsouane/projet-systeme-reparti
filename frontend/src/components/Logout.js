import React from "react";

export default function Logout() {

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <button onClick={logout}>
            Déconnexion
        </button>
    );
}