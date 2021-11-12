import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../assets/img/logo-vinted.png";

const Header = ({ token, setToken, username }) => {
  const handleDeconnection = () => {
    Cookies.remove("token");
    setToken(false);
  };

  return (
    <div>
      {token ? (
        <header className="app">
          <Link to="/">
            <img src={Logo} alt="Logo Vinted" />
          </Link>
          <div style={{ color: "#2cb1ba", fontWeight: "bold" }}>
            Welcome <span style={{ color: "black" }}>{username}</span> !
          </div>
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
    </div>
  );
};

export default Header;
