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
            <button>Vends maintenant</button>
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

            <button>Vends maintenant</button>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        {/* <Routes path="/login">
          <Login setToken={setToken} />
        </Routes> */}
        {/* <Route path="/login" children={<Login setToken={setToken} />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/offer/:offerId" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
