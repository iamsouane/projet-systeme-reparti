import React from 'react';

export default function CartIcon({ count, onClick }) {
    const styles = {
        cartIcon: {
            position: "relative",
            cursor: "pointer",
            fontSize: "22px",
        },
        cartBadge: {
            position: "absolute",
            top: "-8px",
            right: "-8px",
            backgroundColor: "#f08804",
            color: "white",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
        },
    };

    return (
        <div style={styles.cartIcon} onClick={onClick}>
            🛒
            {count > 0 && (
                <span style={styles.cartBadge}>{count}</span>
            )}
        </div>
    );
}