import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Cookies from "js-cookie";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";

import Logo from "./assets/img/logo-vinted.png";

function App() {
  return (
    <Router>
      <header className="app">
        <Link to="/">
          <img src={Logo} alt="Logo Vinted" />
        </Link>
        <div>
          <Link to="/signup">
            <button>S'incrire</button>
          </Link>

          <button>Se connecter</button>
          <button>Vends maintenant</button>
        </div>
      </header>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/offer/:offerId" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
