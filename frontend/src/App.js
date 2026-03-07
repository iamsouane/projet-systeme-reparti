import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Logout from "./components/Logout";
import Cart from "./pages/Cart";
import api from "./services/api";

function Home() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const currentToken = localStorage.getItem("token");
            setToken(currentToken);
            
            if (currentToken) {
                try {
                    const userRes = await api.get("/users/me/");
                    setFirstName(userRes.data.first_name || "");
                    setLastName(userRes.data.last_name || "");
                    
                    // Mettre à jour localStorage
                    localStorage.setItem("firstName", userRes.data.first_name || "");
                    localStorage.setItem("lastName", userRes.data.last_name || "");
                    localStorage.setItem("username", userRes.data.username || "");
                } catch (err) {
                    console.log("Erreur récupération utilisateur:", err);
                    // Fallback sur localStorage
                    setFirstName(localStorage.getItem("firstName") || "");
                    setLastName(localStorage.getItem("lastName") || "");
                }
            }
            setLoading(false);
        };

        fetchUserInfo();
    }, []);

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
            justifyContent: "space-between",
            alignItems: "center",
        },
        logo: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
        },
        navLinks: {
            display: "flex",
            gap: "20px",
            alignItems: "center",
        },
        navLink: {
            color: "white",
            textDecoration: "none",
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "4px",
            transition: "background-color 0.2s",
        },
        mainContent: {
            maxWidth: "1200px",
            margin: "40px auto",
            padding: "20px",
        },
        hero: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "60px 40px",
            textAlign: "center",
            marginBottom: "40px",
        },
        heroTitle: {
            fontSize: "48px",
            color: "#131921",
            marginBottom: "20px",
            fontWeight: "bold",
        },
        heroText: {
            fontSize: "18px",
            color: "#666",
            marginBottom: "30px",
            maxWidth: "600px",
            margin: "0 auto 30px",
        },
        heroButtons: {
            display: "flex",
            gap: "20px",
            justifyContent: "center",
        },
        primaryButton: {
            backgroundColor: "#ffd814",
            color: "#0f1111",
            border: "none",
            borderRadius: "20px",
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            textDecoration: "none",
            transition: "background-color 0.2s",
        },
        secondaryButton: {
            backgroundColor: "white",
            color: "#131921",
            border: "1px solid #ddd",
            borderRadius: "20px",
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            textDecoration: "none",
            transition: "background-color 0.2s",
        },
        features: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            marginTop: "40px",
        },
        featureCard: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "30px",
            textAlign: "center",
        },
        featureIcon: {
            fontSize: "40px",
            marginBottom: "20px",
        },
        featureTitle: {
            fontSize: "20px",
            color: "#131921",
            marginBottom: "10px",
            fontWeight: "600",
        },
        featureDescription: {
            fontSize: "14px",
            color: "#666",
            lineHeight: "1.6",
        },
        userInfo: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "30px",
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        userText: {
            fontSize: "16px",
            color: "#333",
        },
        userName: {
            fontWeight: "bold",
            color: "#131921",
        },
        cartLink: {
            position: "relative",
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
        },
        cartBadge: {
            position: "absolute",
            top: "-8px",
            right: "-8px",
            backgroundColor: "#f08804",
            color: "white",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    };

    // Récupérer le nombre d'articles dans le panier
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = cart.length;

    // Formater le nom complet
    const getFullName = () => {
        if (firstName && lastName) {
            return `${firstName} ${lastName}`;
        } else if (firstName) {
            return firstName;
        } else if (lastName) {
            return lastName;
        } else {
            return "Utilisateur";
        }
    };

    if (loading) {
        return <div style={{ textAlign: "center", padding: "50px" }}>Chargement...</div>;
    }

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

                    <div style={styles.navLinks}>
                        {token ? (
                            <>
                                <Link to="/products" style={styles.navLink}>
                                    Produits
                                </Link>
                                <Link to="/cart" style={styles.cartLink}>
                                    🛒
                                    {cartCount > 0 && (
                                        <span style={styles.cartBadge}>{cartCount}</span>
                                    )}
                                </Link>
                                <Logout />
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={styles.navLink}>
                                    Connexion
                                </Link>
                                <Link to="/register" style={styles.navLink}>
                                    Inscription
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.hero}>
                    <h1 style={styles.heroTitle}>Système Réparti</h1>
                    <p style={styles.heroText}>
                        Bienvenue sur notre plateforme de commerce en ligne 
                        développée avec React, Django, Docker, Kubernetes et Jenkins.
                    </p>
                    
                    {token ? (
                        <div style={styles.heroButtons}>
                            <Link 
                                to="/products" 
                                style={styles.primaryButton}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#f7ca00"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#ffd814"}
                            >
                                Voir les produits
                            </Link>
                            <Link 
                                to="/cart" 
                                style={styles.secondaryButton}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#f5f5f5";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "white";
                                }}
                            >
                                Mon panier ({cartCount})
                            </Link>
                        </div>
                    ) : (
                        <div style={styles.heroButtons}>
                            <Link 
                                to="/login" 
                                style={styles.primaryButton}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#f7ca00"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#ffd814"}
                            >
                                Se connecter
                            </Link>
                            <Link 
                                to="/register" 
                                style={styles.secondaryButton}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#f5f5f5";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "white";
                                }}
                            >
                                Créer un compte
                            </Link>
                        </div>
                    )}
                </div>

                {token && (
                    <div style={styles.userInfo}>
                        <span style={styles.userText}>
                            Connecté en tant que <span style={styles.userName}>
                                {getFullName()}
                            </span>
                        </span>
                    </div>
                )}

                <div style={styles.features}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>⚛️</div>
                        <h3 style={styles.featureTitle}>React</h3>
                        <p style={styles.featureDescription}>
                            Interface utilisateur moderne et réactive
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🐍</div>
                        <h3 style={styles.featureTitle}>Django</h3>
                        <p style={styles.featureDescription}>
                            API REST robuste et sécurisée
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🐘</div>
                        <h3 style={styles.featureTitle}>PostgreSQL</h3>
                        <p style={styles.featureDescription}>
                            Base de données fiable et performante
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🐳</div>
                        <h3 style={styles.featureTitle}>Docker</h3>
                        <p style={styles.featureDescription}>
                            Conteneurisation de l'application
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>☸️</div>
                        <h3 style={styles.featureTitle}>Kubernetes</h3>
                        <p style={styles.featureDescription}>
                            Orchestration et déploiement automatisé
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>⚙️</div>
                        <h3 style={styles.featureTitle}>Jenkins</h3>
                        <p style={styles.featureDescription}>
                            Pipeline CI/CD intégré
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;