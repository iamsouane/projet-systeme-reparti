import React, { useState } from "react";
import api from "../services/api";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {

            const res = await api.post("/token/", {
                username,
                password
            });

            localStorage.setItem("token", res.data.access);

            alert("Connexion réussie");
            window.location.href = "/";

        } catch (err) {
            console.log(err.response?.data);
            alert("Erreur connexion");
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Connexion</h2>

            <input
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>
                Se connecter
            </button>
        </div>
    );
}