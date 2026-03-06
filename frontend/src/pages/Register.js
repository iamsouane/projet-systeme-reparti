import React, { useState } from "react";
import api from "../services/api";

export default function Register() {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {

            await api.post("/users/", {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password
            });

            alert("Compte créé !");
            window.location.href = "/login";

        } catch (err) {
            console.log(err.response?.data);
            alert("Erreur inscription");
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Inscription</h2>

            <input placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />
            <br /><br />

            <input placeholder="Prénom"
                onChange={e => setFirstName(e.target.value)}
            />
            <br /><br />

            <input placeholder="Nom"
                onChange={e => setLastName(e.target.value)}
            />
            <br /><br />

            <input placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <br /><br />

            <input type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={register}>
                S'inscrire
            </button>
        </div>
    );
}