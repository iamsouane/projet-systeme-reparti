import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
    const navigate = useNavigate();

    const styles = {
        container: {
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        icon: {
            fontSize: "80px",
            marginBottom: "20px",
            opacity: 0.5,
        },
        title: {
            fontSize: "24px",
            color: "#333",
            marginBottom: "10px",
        },
        message: {
            fontSize: "16px",
            color: "#666",
            marginBottom: "30px",
        },
        shopBtn: {
            padding: "15px 40px",
            backgroundColor: "#ffd814",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.icon}>🛒</div>
            <h2 style={styles.title}>Votre panier est vide</h2>
            <p style={styles.message}>
                Découvrez nos produits et faites vos achats !
            </p>
            <button 
                style={styles.shopBtn}
                onClick={() => navigate('/products')}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f7ca00"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#ffd814"}
            >
                Continuer mes achats
            </button>
        </div>
    );
}