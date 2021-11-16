import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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

  const navigate = useNavigate();
  const token = Cookies.get("token");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // console.log("file >>>>", file);
        setPreview(URL.createObjectURL(file));
        setPicture(file);
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        "https://vintedlereacteur.herokuapp.com/offer/publish", // mon API
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data._id) {
        setIsLoading(false);
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return token ? (
    <div className="publishPage app">
      <div className="container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          {/* dropzone */}
          <div className="dropZone" {...getRootProps()}>
            <input type="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
            {preview && (
              <img
                onClick={() => {
                  setPreview(null);
                }}
                src={preview}
                alt="preview"
              />
            )}
          </div>

          {/* reste formulaire */}
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
              <textarea
                row="6"
                cols="75"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="ex: porté quelques fois, taille correctement"
              ></textarea>
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
              <input className="exchange" type="checkbox" name="" id="" />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>

          <div>
            {isLoading && <span>offer is uploading ...</span>}
            <input type="submit" value="Ajouter" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
