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
  const [token, setToken] = useState(Cookies.get("token") ? true : false);
  console.log(token);

  return (
    <Router>
      <Header token={token} setToken={setToken} />

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