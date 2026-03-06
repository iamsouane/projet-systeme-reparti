import React, { useEffect, useState } from "react";
import api from "../services/api";
import Logout from "../components/Logout";

export default function Products() {

    const [produits, setProduits] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {

                const token = localStorage.getItem("token");

                const res = await api.get("/produits/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProduits(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();

    }, []);

    return (
        <div style={{ padding: 40 }}>
            <Logout />

            <h2>Produits</h2>

            {produits.length === 0 && <p>Aucun produit</p>}

            {produits.map(p => (
                <div key={p.id}>
                    <h3>{p.nom}</h3>
                    <p>{p.prix} FCFA</p>
                </div>
            ))}

        </div>
    );
}