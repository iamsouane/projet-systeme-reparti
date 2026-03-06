import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Logout from "./components/Logout";

function Home() {

  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: 40 }}>
      <h1>Systeme Reparti</h1>

      {token ? (
        <>
          <p>Connecté</p>
          <Logout />

          <br /><br />
          <a href="/products">Voir produits</a>

        </>
      ) : (
        <>
          <a href="/login">Connexion</a>
          <br />
          <a href="/register">Inscription</a>
        </>
      )}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;