import { useNavigate, Navigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import { RotatingLines } from "react-loader-spinner";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      picture &&
      title &&
      description &&
      price &&
      condition &&
      city &&
      brand &&
      size &&
      color
    ) {
      try {
        setIsLoading(true);

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
          "https://vintedlereacteur.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);

        if (response.data._id) {
          navigate(`/offer/${response.data._id}`);
        }
      } catch (error) {
        console.log("Catch Publish >>>>>", error.response);
        setErrorMessage("La création a échouée, veuillez réessayer.");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs.");
    }
    setIsLoading(false);
  };

  // DropZone package
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        setPreview(URL.createObjectURL(file));
        setPicture(file);
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
      setErrorMessage("");
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return token ? (
    <div className="publishPage app">
      <div className="container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          {/* dropzone */}
          <div className="dropZone" {...getRootProps()}>
            <input type="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Dépose ta photo ici ...</p>
            ) : (
              <p>Dépose ta photo ici, ou clique pour selectionner un fichier</p>
            )}
            {preview && (
              <img
                onClick={() => {
                  setPreview(null);
                }}
                src={preview}
                alt="Prévisualisation"
              />
            )}
          </div>

          {/* Second part of form */}
          <div>
            <div>
              <span>Titre</span>
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="ex: Chemise Sézane verte"
              />
            </div>

            <div>
              <span>Décris ton article</span>
              <textarea
                className="textarea"
                row="16"
                cols="70"
                onChange={(event) => {
                  setDescription(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="ex: porté quelques fois, taille correctement"
              ></textarea>
            </div>
          </div>

          <div>
            <div>
              <span>Marque</span>
              <input
                onChange={(event) => {
                  setBrand(event.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="ex: Zara"
              />
            </div>

            <div>
              <span>Taille</span>
              <input
                onChange={(event) => {
                  setSize(event.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="ex: L / 40 / 12"
              />
            </div>

            <div>
              <span>Couleur</span>
              <input
                onChange={(event) => {
                  setColor(event.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="ex: Fushia"
              />
            </div>

            <div>
              <span>Etat</span>
              <input
                onChange={(event) => {
                  setCondition(event.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="ex: Neuf avec étiquette"
              />
            </div>

            <div>
              <span>Lieu</span>
              <input
                onChange={(event) => {
                  setCity(event.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="ex: Paris"
              />
            </div>
          </div>

          <div>
            <div>
              <span>Prix (en euros)</span>
              <input
                onChange={(event) => {
                  setPrice(Number(event.target.value));
                  setErrorMessage("");
                }}
                type="number"
                placeholder="2,5"
              />
            </div>

            <div>
              <input className="exchange" type="checkbox" />
              <span className="exchangeText">
                Je suis intéressé(e) par les échanges
              </span>
            </div>
          </div>
          {errorMessage && (
            <p style={{ textAlign: "end", color: "#2cb1ba" }}>{errorMessage}</p>
          )}
          <div>
            {isLoading ? (
              <RotatingLines width="40" strokeColor="#2cb1ba" />
            ) : (
              <input type="submit" value="Ajouter" />
            )}
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
