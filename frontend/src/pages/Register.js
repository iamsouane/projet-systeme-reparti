import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        setError("");
        setLoading(true);
        
        try {
            await api.post("/users/", {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password
            });

            alert("Compte créé avec succès !");
            navigate("/login");
        } catch (err) {
            console.log(err.response?.data);
            setError("Erreur lors de l'inscription");
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
        registerButton: {
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
        registerButtonDisabled: {
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
        loginLink: {
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
                        Rejoignez Market Bi
                    </h1>
                    <p style={styles.welcomeText}>
                        Créez votre compte gratuitement et profitez de tous les avantages de notre plateforme.
                    </p>

                    <div style={styles.features}>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>🎁</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Offre de bienvenue</div>
                                <div style={styles.featureDescription}>-10% sur votre première commande</div>
                            </div>
                        </div>

                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>📦</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Suivi des commandes</div>
                                <div style={styles.featureDescription}>Suivez vos colis en temps réel</div>
                            </div>
                        </div>

                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>💬</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Support client</div>
                                <div style={styles.featureDescription}>Une équipe à votre écoute 7j/7</div>
                            </div>
                        </div>

                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>⭐</div>
                            <div style={styles.featureText}>
                                <div style={styles.featureTitle}>Programme de fidélité</div>
                                <div style={styles.featureDescription}>Cumulez des points sur vos achats</div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.testimonial}>
                        <p style={styles.testimonialText}>
                            "Je suis client depuis 6 mois et je ne pourrais plus m'en passer. 
                            La livraison est toujours rapide et les produits de qualité !"
                        </p>
                        <div style={styles.testimonialAuthor}>
                            — Marie L., membre Premium
                        </div>
                    </div>
                </div>

                {/* Right Column - Register Form */}
                <div style={styles.rightSection}>
                    <h2 style={styles.title}>Inscription</h2>
                    <p style={styles.subtitle}>
                        Créez votre compte gratuitement
                    </p>

                    {error && (
                        <div style={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    <div style={styles.form}>
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
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Choisissez un nom d'utilisateur"
                                disabled={loading}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="firstName">
                                Prénom
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                style={styles.input}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Entrez votre prénom"
                                disabled={loading}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="lastName">
                                Nom
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                style={styles.input}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Entrez votre nom"
                                disabled={loading}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Entrez votre email"
                                disabled={loading}
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
                                onFocus={(e) => e.target.style.borderColor = "#131921"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                                placeholder="Entrez votre mot de passe"
                                disabled={loading}
                            />
                        </div>

                        <button 
                            style={{
                                ...styles.registerButton,
                                ...(loading ? styles.registerButtonDisabled : {})
                            }}
                            onClick={register}
                            disabled={loading}
                            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#f7ca00")}
                            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#ffd814")}
                        >
                            {loading ? "Inscription en cours..." : "S'inscrire"}
                        </button>
                    </div>

                    <div style={styles.footer}>
                        <div style={styles.loginLink}>
                            <span style={{ color: "#666" }}>Déjà un compte ? </span>
                            <Link to="/login" style={styles.link}>
                                Se connecter
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