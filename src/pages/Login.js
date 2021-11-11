import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router";

const Login = ({ setToken }) => {
  console.log(setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const fetchLoginData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          //   "https://vintedlereacteur.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        setLoginData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchLoginData();
    if (isLoading === false) {
      //   console.log(loginData);
      Cookies.set("token", loginData.token, { expires: 4, secure: true });
      setToken(true);
      navigate("/");
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
