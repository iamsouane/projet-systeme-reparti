import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { styles } from "../styles/productsStyles";

export default function Products() {
    const [produits, setProduits] = useState([]);
    const [filteredProduits, setFilteredProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const navigate = useNavigate();

    // Catégories
    const categories = ["Tous", "Électronique", "Mode", "Maison", "Sports", "Livres"];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchProducts();
        
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(savedCart.length);
    }, [navigate]);

    useEffect(() => {
        // Filtrer les produits quand la recherche change
        let filtered = [...produits];
        
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.nom.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        if (selectedCategory !== 'Tous') {
            // À adapter selon votre logique de catégories
            filtered = filtered.filter(p => 
                p.categorie === selectedCategory
            );
        }
        
        setFilteredProduits(filtered);
    }, [searchQuery, selectedCategory, produits]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/produits/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProduits(res.data);
            setFilteredProduits(res.data);
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (produit) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(produit);
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartCount(cart.length);
        
        alert(`${produit.nom} ajouté au panier`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleCartClick = () => {
        // Rediriger vers la page panier
        alert('Voir le panier - à implémenter');
    };

    if (loading) {
        return <Loader message="Chargement des produits..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                cartCount={cartCount}
                onSearch={handleSearch}
                onCartClick={handleCartClick}
            />

            <CategoryBar 
                categories={categories}
                onSelectCategory={handleCategorySelect}
            />

            <main style={styles.mainContent}>
                {filteredProduits.length === 0 ? (
                    <div style={styles.emptyState}>
                        <h3>Aucun produit trouvé</h3>
                        <p>Essayez de modifier vos critères de recherche</p>
                    </div>
                ) : (
                    <>
                        <p style={{ marginBottom: "15px", color: "#666" }}>
                            {filteredProduits.length} produit(s) trouvé(s)
                        </p>
                        <div style={styles.productsGrid}>
                            {filteredProduits.map((produit) => (
                                <ProductCard
                                    key={produit.id}
                                    product={produit}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}