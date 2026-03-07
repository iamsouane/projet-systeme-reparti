import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const styles = {
        productCard: {
            backgroundColor: "white",
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow: isHovered 
                ? "0 4px 8px rgba(0,0,0,0.2)" 
                : "0 1px 3px rgba(0,0,0,0.1)",
            transform: isHovered ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.2s, boxShadow 0.2s",
            cursor: "pointer",
        },
        productImage: {
            width: "100%",
            height: "200px",
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            color: "#999",
        },
        productInfo: {
            padding: "15px",
        },
        productName: {
            fontSize: "16px",
            fontWeight: "500",
            color: "#0f1111",
            marginBottom: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        productPrice: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#b12704",
            marginBottom: "8px",
        },
        productStock: {
            fontSize: "12px",
            color: product.stock > 0 ? "#2e7d32" : "#c62828",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
        },
        addToCartBtn: {
            width: "100%",
            padding: "8px",
            backgroundColor: isButtonHovered ? "#f7ca00" : "#ffd814",
            border: "none",
            borderRadius: "20px",
            cursor: product.stock > 0 ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "500",
            opacity: product.stock > 0 ? 1 : 0.5,
            transition: "background-color 0.2s",
        },
    };

    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString() + ' FCFA';
    };

    return (
        <div
            style={styles.productCard}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.productImage}>
                {product.nom.charAt(0).toUpperCase()}
            </div>
            <div style={styles.productInfo}>
                <div style={styles.productName}>
                    {product.nom}
                </div>
                <div style={styles.productPrice}>
                    {formatPrice(product.prix)}
                </div>
                <div style={styles.productStock}>
                    {product.stock > 0 ? '✅ En stock' : '❌ Rupture de stock'}
                </div>
                <button
                    style={styles.addToCartBtn}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                >
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
}