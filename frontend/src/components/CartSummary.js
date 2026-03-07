import React from 'react';

export default function CartSummary({ items, onCheckout }) {
    const calculateSubtotal = () => {
        return items.reduce((total, item) => {
            return total + (parseFloat(item.prix) * (item.quantity || 1));
        }, 0);
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        // Livraison gratuite à partir de 50000 FCFA
        return subtotal >= 50000 ? 0 : 2500;
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.18; // TVA 18%
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping() + calculateTax();
    };

    const styles = {
        summary: {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            position: "sticky",
            top: "100px",
        },
        title: {
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid #e0e0e0",
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
            fontSize: "16px",
        },
        totalRow: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "2px solid #e0e0e0",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#b12704",
        },
        promoSection: {
            marginTop: "20px",
            padding: "15px 0",
            borderTop: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
        },
        promoInput: {
            width: "100%",
            padding: "10px",
            border: "1px solid #d0d0d0",
            borderRadius: "4px",
            marginBottom: "10px",
            fontSize: "14px",
        },
        promoBtn: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#f0f2f5",
            border: "1px solid #d0d0d0",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
        },
        checkoutBtn: {
            width: "100%",
            padding: "15px",
            backgroundColor: "#ffd814",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: "20px",
        },
        checkoutBtnHover: {
            backgroundColor: "#f7ca00",
        },
        securePayment: {
            textAlign: "center",
            marginTop: "15px",
            fontSize: "12px",
            color: "#666",
        },
    };

    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax();
    const total = calculateTotal();

    return (
        <div style={styles.summary}>
            <div style={styles.title}>Récapitulatif</div>
            
            <div style={styles.row}>
                <span>Sous-total ({items.length} article{items.length > 1 ? 's' : ''})</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
            </div>
            
            <div style={styles.row}>
                <span>Livraison</span>
                <span style={{ color: shipping === 0 ? "#2e7d32" : "inherit" }}>
                    {shipping === 0 ? "Gratuite" : `${shipping.toLocaleString()} FCFA`}
                </span>
            </div>
            
            <div style={styles.row}>
                <span>TVA (18%)</span>
                <span>{tax.toLocaleString()} FCFA</span>
            </div>

            <div style={styles.promoSection}>
                <input 
                    type="text" 
                    style={styles.promoInput}
                    placeholder="Code promo"
                />
                <button style={styles.promoBtn}>
                    Appliquer
                </button>
            </div>
            
            <div style={styles.totalRow}>
                <span>Total</span>
                <span>{total.toLocaleString()} FCFA</span>
            </div>

            <button 
                style={styles.checkoutBtn}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f7ca00"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#ffd814"}
                onClick={onCheckout}
            >
                Procéder au paiement
            </button>

            <div style={styles.securePayment}>
                🔒 Paiement 100% sécurisé
            </div>
        </div>
    );
}