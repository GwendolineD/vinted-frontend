import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  // const [userData, setUserData] = useState(""); // pose problème à la réouverture de la page, essayer avec des cookies
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState(1000);
  const [priceMin, setPriceMin] = useState(0);

  const [token, setToken] = useState(Cookies.get("token") ? true : false);
  // console.log(token);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        setSearch={setSearch}
        setPriceMax={setPriceMax}
        priceMax={priceMax}
        setPriceMin={setPriceMin}
        priceMin={priceMin}
      />

      <Routes>
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={
            <Home search={search} priceMax={priceMax} priceMin={priceMin} />
          }
        />
        <Route path="/offer/:offerId" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
