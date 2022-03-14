import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://vintedlereacteur.herokuapp.com/user/signup",
        {
          email: email,
          username: name,
          phone: "0607080910",
          password: password,
        }
      );
      // console.log(response.data);

      Cookies.set("token", response.data.token, { expires: 4, secure: true });
      setToken(true);
      navigate("/");
    } catch (error) {
      console.log("Catch signUp >>>>>", error.response);
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

        <input type="submit" value="S'inscrire" />
      </form>

      <Link to="/login">
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </div>
  );
};

export default Signup;
