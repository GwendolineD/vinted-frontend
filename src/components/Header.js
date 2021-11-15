import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
  const isToken = Cookies.get("token");
  console.log(isToken);
  const handleSellNow = () => {
    if (isToken) {
      navigate("/publish");
    } else {
      navigate("/login");
    }
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

          {/* {userData && (
            <div style={{ color: "#2cb1ba", fontWeight: "bold" }}>
              Welcome{" "}
              <span style={{ color: "black" }}>
                {userData.account.username}
              </span>{" "}
              !
            </div>
          )} // pose problème à la réouverture de la page, essayer avec des cookies*/}

          <div>
            <button onClick={handleDeconnection}>Se déconnecter</button>
            <button onClick={handleSellNow} className="headerLastButton">
              Vends maintenant
            </button>
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

            <button onClick={handleSellNow} className="headerLastButton">
              Vends maintenant
            </button>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
