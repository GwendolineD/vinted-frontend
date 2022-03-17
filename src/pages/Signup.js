import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import defaultAvatar from "../assets/img/defaultAvatar.png";

const Signup = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && email && password && phone) {
      try {
        const formData = new FormData();
        formData.append("username", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("picture", avatar);

        const response = await axios.post(
          "https://vintedlereacteur.herokuapp.com/user/signup",
          // {
          //   email: email,
          //   username: name,
          //   phone: phone,
          //   password: password,
          // }
          formData
        );
        console.log(response.data);

        Cookies.set("token", response.data.token, { expires: 4, secure: true });
        setToken(true);
        navigate("/");
      } catch (error) {
        console.log("Catch signUp >>>>>", error.response);
        if (error.response?.status === 409 || error.response?.status === 406) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("La connexion a échoué, veuillez réessayer.");
        }
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs (photo facultative).");
    }
  };

  return (
    <div className="app signupPage">
      <h1>S'incrire</h1>

      <form className="signupForm" onSubmit={handleSubmit}>
        <div>
          <div className="signupCol1">
            <input
              onChange={(event) => {
                setName(event.target.value);
                setErrorMessage("");
              }}
              type="text"
              placeholder="Nom d'utilisateur"
              value={name}
            />

            <input
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              type="email"
              placeholder="Email"
              value={email}
            />

            <input
              onChange={(event) => {
                setPhone(event.target.value);
                setErrorMessage("");
              }}
              type="tel"
              pattern="[0]{1}[0-9]{9}"
              placeholder="Téléphone (0678692645)"
              value={phone}
            />

            <input
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage("");
              }}
              type="password"
              placeholder="Mot de passe"
              value={password}
            />
          </div>

          <div className="signupCol2">
            <label htmlFor="file">
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  setAvatar(event.target.files[0]);
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }}
              />
              <span>Ajouter une photo</span>
            </label>

            <div className="avatar">
              <img
                src={preview ? preview : defaultAvatar}
                alt="Prévisualisation"
                className="avatarPreview"
              />
              <div
                onClick={() => {
                  setPreview(null);
                }}
                className="deleteAvatar"
              >
                x
              </div>
            </div>
          </div>
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <input type="submit" value="S'inscrire" />
      </form>

      <Link to="/login">
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </div>
  );
};

export default Signup;
