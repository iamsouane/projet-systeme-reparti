import React from 'react';

export default function Loader({ message = "Chargement..." }) {
    const styles = {
        loader: {
            textAlign: "center",
            padding: "50px",
            fontSize: "18px",
            color: "#666",
        },
        spinner: {
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #131921",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
            margin: "20px auto",
        },
    };

    // Ajouter l'animation au head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    return (
        <div style={styles.loader}>
            <div style={styles.spinner}></div>
            <p>{message}</p>
        </div>
    );
}