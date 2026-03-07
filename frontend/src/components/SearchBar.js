import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    const styles = {
        searchBar: {
            flex: "1",
            maxWidth: "600px",
            margin: "0 20px",
            display: "flex",
        },
        searchInput: {
            flex: "1",
            padding: "10px",
            border: "none",
            borderRadius: "4px 0 0 4px",
            fontSize: "16px",
            outline: "none",
        },
        searchButton: {
            padding: "10px 20px",
            backgroundColor: "#febd69",
            border: "none",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
        },
        searchButtonHover: {
            backgroundColor: "#f3a847",
        },
    };

    return (
        <form style={styles.searchBar} onSubmit={handleSubmit}>
            <input
                type="text"
                style={styles.searchInput}
                placeholder="Rechercher un produit..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                style={styles.searchButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f3a847"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#febd69"}
            >
                🔍
            </button>
        </form>
    );
}