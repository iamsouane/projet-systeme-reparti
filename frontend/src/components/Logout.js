import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        
        navigate('/login');
    };

    const styles = {
        logoutBtn: {
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
            padding: "5px 15px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background-color 0.2s",
        },
    };

    return (
        <button
            style={styles.logoutBtn}
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            onClick={handleLogout}
        >
            Déconnexion
        </button>
    );
}