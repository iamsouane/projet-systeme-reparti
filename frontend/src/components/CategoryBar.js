import React, { useState } from 'react';

export default function CategoryBar({ categories = [], onSelectCategory }) {
    const [selected, setSelected] = useState('Tous');

    const styles = {
        categoryBar: {
            backgroundColor: "white",
            padding: "10px 20px",
            marginBottom: "20px",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center", 
            gap: "30px",                
            overflowX: "auto",
            scrollbarWidth: "thin",
            flexWrap: "wrap",          
        },
        categoryItem: (isSelected) => ({
            color: isSelected ? "#131921" : "#555",
            cursor: "pointer",
            whiteSpace: "nowrap",
            padding: "8px 0",          
            borderBottom: isSelected ? "2px solid #febd69" : "2px solid transparent",
            fontWeight: isSelected ? "600" : "400",
            fontSize: "15px",         
            transition: "color 0.2s, border-bottom 0.2s", 
        }),
    };

    const handleClick = (category) => {
        setSelected(category);
        if (onSelectCategory) onSelectCategory(category);
    };

    return (
        <div style={styles.categoryBar}>
            {categories.map((category, index) => (
                <span
                    key={index}
                    style={styles.categoryItem(selected === category)}
                    onClick={() => handleClick(category)}
                    onMouseEnter={(e) => {
                        if (selected !== category) {
                            e.target.style.color = "#131921";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selected !== category) {
                            e.target.style.color = "#555";
                        }
                    }}
                >
                    {category}
                </span>
            ))}
        </div>
    );
}