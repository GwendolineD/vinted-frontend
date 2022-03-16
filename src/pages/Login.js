import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          "https://vintedlereacteur.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        // console.log(response.data);

        Cookies.set("token", response.data.token, { expires: 4, secure: true });
        setToken(true);

        navigate(location.state?.from ? location.state.from : "/"); // TO DO : redirect to the offer, not payement page
      } catch (error) {
        console.log("Catch login>>>>>", error.response);
        if (error.response?.status === 401) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("La connexion a échoué, veuillez réessayer.");
        }
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="app loginPage">
      <h1>Se connecter</h1>

      <form onSubmit={handleLogin}>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
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
            setErrorMessage("");
          }}
          type="password"
          placeholder="Mot de passe"
          value={password}
          name=""
          id=""
        />

        {errorMessage && <p>{errorMessage}</p>}

        <input type="submit" value="Se connecter" />
      </form>

      <Link to="/signup">
        <p>Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </div>
  );
};

export default Login;
