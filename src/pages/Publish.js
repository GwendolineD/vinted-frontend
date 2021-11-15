import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState({});

  const navigate = useNavigate();

  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/offer/publish", // API du recteur
        "https://vintedlereacteur.herokuapp.com/offer/publish", // mon API
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <div className="publishPage">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
            type="file"
          />
        </div>

        <div>
          <div>
            <span>Titre</span>
            <input
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="ex: Chemise Sézane verte"
            />
          </div>

          <div>
            <span>Décris ton article</span>
            <input
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              placeholder="ex: porté quelques fois, taille correctement"
            />
          </div>
        </div>

        <div>
          <div>
            <span>Marque</span>
            <input
              onChange={(event) => setBrand(event.target.value)}
              type="text"
              placeholder="ex: Zara"
            />
          </div>

          <div>
            <span>Taille</span>
            <input
              onChange={(event) => setSize(event.target.value)}
              type="text"
              placeholder="ex: L / 40 / 12"
            />
          </div>

          <div>
            <span>Couleur</span>
            <input
              onChange={(event) => setColor(event.target.value)}
              type="text"
              placeholder="ex: Fushia"
            />
          </div>

          <div>
            <span>Etat</span>
            <input
              onChange={(event) => setCondition(event.target.value)}
              type="text"
              placeholder="ex: Neuf avec étiquette"
            />
          </div>

          <div>
            <span>Lieu</span>
            <input
              onChange={(event) => setCity(event.target.value)}
              type="text"
              placeholder="ex: Paris"
            />
          </div>
        </div>

        <div>
          <div>
            <span>Prix</span>
            <input
              onChange={(event) => {
                setPrice(Number(event.target.value));
              }}
              type="number"
              placeholder="2,5"
            />
          </div>

          <div>
            <input type="checkbox" name="" id="" />
            <span>Je suis intéressé(e) par les échanges</span>
          </div>
        </div>
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  );
};

export default Publish;
