import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Logo from "./assets/img/logo-vinted.png";

function App() {
  const [token, setToken] = useState(Cookies.get("token") ? true : false);
  console.log(token);

  const handleDeconnection = () => {
    Cookies.remove("token");
    setToken(false);
  };

  return (
    <Router>
      {token ? (
        <header className="app">
          <Link to="/">
            <img src={Logo} alt="Logo Vinted" />
          </Link>
          <div>
            <button onClick={handleDeconnection}>Se déconnecter</button>
            <button className="headerLastButton">Vends maintenant</button>
          </div>
        </header>
      ) : (
        <header className="app">
          <Link to="/">
            <img src={Logo} alt="Logo Vinted" />
          </Link>
          <div>
            <Link to="/signup">
              <button>S'incrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>

            <button className="headerLastButton">Vends maintenant</button>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Home />} />
        <Route path="/offer/:offerId" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
