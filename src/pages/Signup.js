import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup", //API du reacteur
        //   "https://vintedlereacteur.herokuapp.com/user/signup",//mon API
        {
          email: email,
          username: name,
          phone: "0607080910",
          password: password,
        }
      );
      // console.log(response.data);
      // setUserData(response.data);// pose problème à la réouverture de la page, essayer avec des cookies

      Cookies.set("token", response.data.token, { expires: 4, secure: true });
      setToken(true);
      navigate("/");
      //
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="app signupPage">
      <h1>S'incrire</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
          placeholder="Nom d'utilisateur"
          value={name}
        />
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="Mot de passe"
          value={password}
        />

        <div className="checkboxContainer">
          <input type="checkbox" name="" id="" />
          <span>S'inscrire à notre newsletter</span>
        </div>

        <p>
          En m'inscrivant, je confirme que j'ai accepté les Termes & Conditions
          de Vinted, avoir lu la Politique de Confidentialité, et que j'ai plus
          de 18 ans.
        </p>
        <input type="submit" value="S'inscrire" />
        {/* ou boutton de type submit */}
      </form>
      <Link to="/login">
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </div>
  );
};

export default Signup;
