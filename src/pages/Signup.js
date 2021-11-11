import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchSignupData = async () => {
      //   console.log("coucou");
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email: email,
            username: name,
            phone: "0607080910",
            password: password,
          }
        );
        console.log(response.data);
        setSignupData(response.data);
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchSignupData();
    if (isLoading === false) {
      console.log(signupData.token);
      Cookies.set("token", signupData.token, { expires: 4, secure: true });
      navigate("/");
    }
  };

  return (
    <div>
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
        <input type="checkbox" name="S'inscrire à notree newsletter" id="" />
        <p>
          En m'inscrivant, je confirme que j'ai accepté les Termes & Conditions
          de Vinted, avoir lu la Politique de Confidentialité, et que j'ai plus
          de 18 ans.
        </p>
        <input type="submit" value="S'inscrire" />
      </form>
      <Link to="/login">
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </div>
  );
};

export default Signup;
