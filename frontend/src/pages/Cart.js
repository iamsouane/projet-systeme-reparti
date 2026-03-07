import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        loadCart();
    }, [navigate]);

    const loadCart = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Ajouter quantité à chaque item si pas déjà présent
        const itemsWithQuantity = savedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartItems(itemsWithQuantity);
        setLoading(false);
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        alert('Redirection vers la page de paiement...');
        // Implémenter la logique de paiement
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
            position: "sticky",
            top: 0,
            zIndex: 100,
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
        mainContent: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
        },
        cartTitle: {
            fontSize: "28px",
            marginBottom: "20px",
            color: "#333",
        },
        cartContent: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
        },
        itemsList: {
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        itemsHeader: {
            padding: "15px 20px",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        itemsCount: {
            color: "#666",
            fontSize: "14px",
        },
        clearCartBtn: {
            backgroundColor: "transparent",
            border: "1px solid #dc3545",
            color: "#dc3545",
            padding: "5px 15px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
        },
        continueShopping: {
            marginTop: "20px",
            textAlign: "center",
        },
        continueLink: {
            color: "#0066c0",
            textDecoration: "none",
            fontSize: "14px",
        },
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={{ textAlign: "center", padding: "50px" }}>
                    Chargement du panier...
                </div>
            </div>
        );
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
                    <button 
                        onClick={() => navigate('/products')}
                        style={{
                            backgroundColor: "transparent",
                            color: "white",
                            border: "1px solid white",
                            padding: "5px 15px",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        ← Continuer mes achats
                    </button>
                </div>
            </header>

            <main style={styles.mainContent}>
                <h1 style={styles.cartTitle}>Votre panier</h1>

                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div style={styles.cartContent}>
                        <div>
                            <div style={styles.itemsList}>
                                <div style={styles.itemsHeader}>
                                    <span>
                                        <strong>{cartItems.length}</strong> article{cartItems.length > 1 ? 's' : ''}
                                    </span>
                                    <button 
                                        style={styles.clearCartBtn}
                                        onClick={() => {
                                            if (window.confirm('Vider le panier ?')) {
                                                setCartItems([]);
                                                localStorage.removeItem('cart');
                                            }
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#dc3545";
                                            e.target.style.color = "white";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "transparent";
                                            e.target.style.color = "#dc3545";
                                        }}
                                    >
                                        Vider le panier
                                    </button>
                                </div>
                                
                                {cartItems.map((item, index) => (
                                    <CartItem
                                        key={`${item.id}-${index}`}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))}
                            </div>

                            <div style={styles.continueShopping}>
                                <a 
                                    href="#" 
                                    style={styles.continueLink}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/products');
                                    }}
                                >
                                    ← Voir plus de produits
                                </a>
                            </div>
                        </div>

                        <CartSummary 
                            items={cartItems}
                            onCheckout={handleCheckout}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}