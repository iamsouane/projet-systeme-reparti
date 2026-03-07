import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import { styles } from '../styles/productsStyles';

export default function Header({ cartCount, onSearch, onCartClick }) {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <div 
                    style={styles.logo}
                    onClick={() => navigate('/')}
                >
                    🛍️ Market Bi
                </div>
                
                <SearchBar onSearch={onSearch} />

                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <Logout />
                    <div onClick={handleCartClick} style={{ cursor: 'pointer' }}>
                        <CartIcon count={cartCount} />
                    </div>
                </div>
            </div>
        </header>
    );
}