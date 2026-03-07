import React, { useState } from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    const [quantity, setQuantity] = useState(item.quantity || 1);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
            onUpdateQuantity(item.id, newQuantity);
        }
    };

    const styles = {
        cartItem: {
            display: "flex",
            padding: "20px",
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "white",
            gap: "20px",
            flexWrap: "wrap",
        },
        image: {
            width: "100px",
            height: "100px",
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            color: "#999",
            borderRadius: "4px",
        },
        details: {
            flex: "2",
            minWidth: "200px",
        },
        name: {
            fontSize: "18px",
            fontWeight: "500",
            color: "#0f1111",
            marginBottom: "8px",
        },
        price: {
            fontSize: "18px",
            fontWeight: "bold",
            color: "#b12704",
            marginBottom: "8px",
        },
        stock: {
            fontSize: "14px",
            color: item.stock > 0 ? "#2e7d32" : "#c62828",
            marginBottom: "10px",
        },
        quantityControls: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
        },
        quantityBtn: {
            width: "30px",
            height: "30px",
            backgroundColor: "#f0f2f5",
            border: "1px solid #d0d0d0",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
        },
        quantityInput: {
            width: "50px",
            height: "30px",
            textAlign: "center",
            border: "1px solid #d0d0d0",
            borderRadius: "4px",
            fontSize: "14px",
        },
        priceSection: {
            flex: "1",
            minWidth: "150px",
            textAlign: "right",
        },
        totalPrice: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#b12704",
            marginBottom: "10px",
        },
        removeBtn: {
            backgroundColor: "transparent",
            border: "none",
            color: "#999",
            cursor: "pointer",
            fontSize: "14px",
            textDecoration: "underline",
        },
        removeBtnHover: {
            color: "#c62828",
        },
    };

    const totalItemPrice = (parseFloat(item.prix) * quantity).toLocaleString();

    return (
        <div style={styles.cartItem}>
            <div style={styles.image}>
                {item.nom.charAt(0).toUpperCase()}
            </div>
            
            <div style={styles.details}>
                <div style={styles.name}>{item.nom}</div>
                <div style={styles.price}>{parseFloat(item.prix).toLocaleString()} FCFA</div>
                <div style={styles.stock}>
                    {item.stock > 0 ? `✅ ${item.stock} disponibles` : "❌ Rupture"}
                </div>
                
                <div style={styles.quantityControls}>
                    <button 
                        style={styles.quantityBtn}
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        style={styles.quantityInput}
                        value={quantity}
                        min="1"
                        max={item.stock}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    />
                    <button 
                        style={styles.quantityBtn}
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= item.stock}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <div style={styles.priceSection}>
                <div style={styles.totalPrice}>{totalItemPrice} FCFA</div>
                <button 
                    style={styles.removeBtn}
                    onMouseEnter={(e) => e.target.style.color = "#c62828"}
                    onMouseLeave={(e) => e.target.style.color = "#999"}
                    onClick={() => onRemove(item.id)}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}