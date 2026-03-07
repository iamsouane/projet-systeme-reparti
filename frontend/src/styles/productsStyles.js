// Styles partagés pour tous les composants
export const styles = {
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
        textDecoration: "none",
        cursor: "pointer",
    },
    mainContent: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
    },
    productsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
    },
    emptyState: {
        textAlign: "center",
        padding: "50px",
        backgroundColor: "white",
        borderRadius: "8px",
        color: "#666",
    },
};