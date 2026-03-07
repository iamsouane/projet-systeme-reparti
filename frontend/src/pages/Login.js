import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 1. Obtenir le token
            const res = await api.post("/token/", {
                username,
                password
            });

            localStorage.setItem("token", res.data.access);
            
            // 2. Récupérer les infos de l'utilisateur connecté via /users/me/
            try {
                const userRes = await api.get("/users/me/");
                
                // Stocker les infos utilisateur
                localStorage.setItem("firstName", userRes.data.first_name || "");
                localStorage.setItem("lastName", userRes.data.last_name || "");
                localStorage.setItem("username", userRes.data.username || username);
                localStorage.setItem("email", userRes.data.email || "");
                
                console.log("✅ Infos utilisateur récupérées:", userRes.data);
                
            } catch (userErr) {
                console.log("❌ Erreur récupération utilisateur:", userErr);
                // Fallback: stocker seulement le username
                localStorage.setItem("firstName", "");
                localStorage.setItem("lastName", "");
                localStorage.setItem("username", username);
                localStorage.setItem("email", "");
            }

            navigate("/");
        } catch (err) {
            console.log(err.response?.data);
            setError("Nom d'utilisateur ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            backgroundColor: "#f0f2f5",
            minHeight: "100vh",
        },
        header: {
            backgroundColor: "#131921",
            color: "white",
            padding: "10px 20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        },
        headerContent: {
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
            textAlign: "center",
        },
        mainContent: {
            maxWidth: "1200px",
            margin: "40px auto",
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
        },
        leftSection: {
            padding: "40px",
        },
        welcomeTitle: {
            fontSize: "36px",
            color: "#131921",
            marginBottom: "20px",
            fontWeight: "bold",
        },
        welcomeText: {
            fontSize: "18px",
            color: "#555",
            marginBottom: "30px",
            lineHeight: "1.6",
        },
        features: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
        },
        featureItem: {
            display: "flex",
            alignItems: "center",
            gap: "15px",
        },
        featureIcon: {
            fontSize: "24px",
            width: "50px",
            height: "50px",
            backgroundColor: "#ffd814",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        featureText: {
            fontSize: "16px",
            color: "#333",
        },
        featureTitle: {
            fontWeight: "600",
            marginBottom: "5px",
        },
        featureDescription: {
            color: "#666",
            fontSize: "14px",
        },
        rightSection: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "40px",
        },
        title: {
            fontSize: "28px",
            color: "#131921",
            marginBottom: "10px",
        },
        subtitle: {
            color: "#666",
            fontSize: "14px",
            marginBottom: "30px",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
        },
        inputGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
        },
        label: {
            color: "#555",
            fontSize: "14px",
            fontWeight: "500",
        },
        input: {
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s",
        },
        errorAlert: {
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            borderRadius: "4px",
            fontSize: "14px",
            marginBottom: "20px",
            border: "1px solid #f5c6cb",
        },
        loginButton: {
            backgroundColor: "#ffd814",
            color: "#0f1111",
            border: "none",
            borderRadius: "20px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginTop: "10px",
        },
        loginButtonDisabled: {
            opacity: 0.5,
            cursor: "not-allowed",
        },
        footer: {
            marginTop: "30px",
            textAlign: "center",
        },
        link: {
            color: "#0066c0",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
        },
        registerLink: {
            marginTop: "20px",
            padding: "20px 0 0",
            borderTop: "1px solid #e0e0e0",
        },
        backLink: {
            display: "inline-block",
            marginTop: "15px",
            color: "#666",
            textDecoration: "none",
            fontSize: "13px",
        },
        testimonial: {
            marginTop: "40px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            borderLeft: "4px solid #ffd814",
        },
        testimonialText: {
            fontSize: "14px",
            color: "#555",
            fontStyle: "italic",
            marginBottom: "10px",
        },
        testimonialAuthor: {
            fontSize: "13px",
            color: "#888",
            fontWeight: "500",
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div 
                        style={styles.logo}
                        onClick={() => navigate('/')}
                    >
                        🛍️ Market Bi
                    </div>
                </div>
            </header>

            <main style={styles.mainContent}>
                {/* Left Column - Site Info */}
                <div style={styles.leftSection}>
                    <h1 style={styles.welcomeTitle}>
                        Bienvenue sur Market Bi
                    </h1>
                    <p style={styles.welcomeText}>
                        La plateforme de commerce en ligne qui connecte acheteurs et vendeurs dans toute l'Afrique.
                    </p>

                    <div style={styles.features}>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>🛡️</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Paiements sécurisés</div>
                                <div style={styles.featureDescription}>Vos transactions sont protégées 24h/24</div>
                            </div>
                        </div>

                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>🚚</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Livraison rapide</div>
                                <div style={styles.featureDescription}>Livraison en 24-48h dans toute la région</div>
                            </div>
                        </div>

                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>⭐</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Produits de qualité</div>
                                <div style={styles.featureDescription}>Des milliers de produits vérifiés</div>
                            </div>
                        </div>

                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>🎁</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Offres exclusives</div>
                                <div style={styles.featureDescription}>Promotions et réductions toute l'année</div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.testimonial}>
                        <p style={styles.testimonialText}>
                            "Market Bi a transformé ma façon de faire des achats. 
                            Interface intuitive, livraison rapide et service client exceptionnel !"
                        </p>
                        <div style={styles.testimonialAuthor}>
                            — Jean K., client depuis 2023
                        </div>
                    </div>
                </div>

                {/* Right Column - Login Form */}
                <div style={styles.rightSection}>
                    <h2 style={styles.title}>Connexion</h2>
                    <p style={styles.subtitle}>
                        Connectez-vous pour accéder à votre compte
                    </p>

                    {error && (
                        <div style={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    <form style={styles.form} onSubmit={login}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="username">
                                Nom d'utilisateur
                            </label>
                            <input
                                id="username"
                                type="text"
                                style={styles.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={loading}
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Entrez votre nom d'utilisateur"
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Entrez votre mot de passe"
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                ...styles.loginButton,
                                ...(loading ? styles.loginButtonDisabled : {})
                            }}
                            disabled={loading}
                            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#f7ca00")}
                            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#ffd814")}
                        >
                            {loading ? "Connexion en cours..." : "Se connecter"}
                        </button>
                    </form>

                    <div style={styles.footer}>
                        <div style={styles.registerLink}>
                            <span style={{ color: "#666" }}>Nouveau client ? </span>
                            <Link to="/register" style={styles.link}>
                                Créer votre compte
                            </Link>
                        </div>
                        
                        <Link to="/" style={styles.backLink}>
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}