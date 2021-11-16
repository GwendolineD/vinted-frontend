import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location>>>", location);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/login", //API du reacteur
        "https://vintedlereacteur.herokuapp.com/user/login", //mon API
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);

      Cookies.set("token", response.data.token, { expires: 4, secure: true });
      setToken(true);

      navigate(location.state?.fromPayment ? "/payment" : "/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="app loginPage">
      <h1>Se connecter</h1>
      <form onSubmit={handleLogin}>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          placeholder="Adresse email"
          value={email}
          name=""
          id=""
        />
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="Mot de passe"
          value={password}
          name=""
          id=""
        />
        <input type="submit" value="Se connecter" />
      </form>
      <Link to="/signup">
        <p>Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </div>
  );
};

export default Login;
