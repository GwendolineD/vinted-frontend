import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../assets/img/logo-vinted.png";
import Filter from "./Filter";

const Header = ({
  token,
  setToken,
  setSearch,
  setPriceMax,
  priceMax,
  setPriceMin,
  priceMin,
  setSort,
  sort,
}) => {
  const navigate = useNavigate();

  const handleDeconnection = () => {
    Cookies.remove("token");
    setToken(false);
    navigate("/");
  };

  return (
    <div>
      {token ? (
        <header className="app">
          <Link to="/">
            <img src={Logo} alt="Logo Vinted" />
          </Link>
          <Filter
            setSearch={setSearch}
            setPriceMax={setPriceMax}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            priceMin={priceMin}
            setSort={setSort}
            sort={sort}
          />

          <div>
            <button onClick={handleDeconnection} className="deconnect">
              Se déconnecter
            </button>
            <Link to="/publish">
              <button className="headerLastButton">Vends maintenant</button>
            </Link>
          </div>
        </header>
      ) : (
        <header className="app">
          <Link to="/" className="headerElement">
            <img src={Logo} alt="Logo Vinted" />
          </Link>
          <Filter
            setSearch={setSearch}
            setPriceMax={setPriceMax}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            priceMin={priceMin}
            setSort={setSort}
            sort={sort}
          />
          <div className="headerElement">
            <Link to="/signup">
              <button>S'incrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
            <Link to="/publish">
              <button className="headerLastButton">Vends maintenant</button>
            </Link>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
