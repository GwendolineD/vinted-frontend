import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../assets/img/logo-vinted.png";

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
  const handleDeconnection = () => {
    Cookies.remove("token");
    setToken(false);
  };

  const handleSort = () => {
    if (sort === "price-asc") {
      setSort("price-desc");
    } else {
      setSort("price-asc");
    }
  };

  return (
    <div>
      {token ? (
        <header className="app">
          <Link to="/">
            <img src={Logo} alt="Logo Vinted" />
          </Link>
          <div>
            <input
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              type="search"
              placeholder="Recherche"
              name=""
              id=""
            />
            <div>
              <span>Trie par prix croissant/décroissant</span>
              <input onChange={handleSort} type="checkbox" />
              <span>prix min</span>
              <input
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
                type="number"
                value={priceMin}
              />
              <span>prix max</span>
              <input
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
                type="number"
                value={priceMax}
              />
            </div>
          </div>

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
