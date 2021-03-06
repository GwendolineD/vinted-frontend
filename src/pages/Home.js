import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import bandeau from "../assets/img/banner.jpg";
import dechirement from "../assets/img/dechirement.svg";
import avatar from "../assets/img/defaultAvatar.png";

const Home = ({ search, priceMax, priceMin, sort }) => {
  const [dataOffers, setDataOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let sortChoice = "price_asc";
    if (!sort) {
      sortChoice = "price_desc";
    }

    try {
      const fetchDataOffers = async () => {
        const response = await axios.get(
          `https://vintedlereacteur.herokuapp.com/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sortChoice}`
        );

        console.log("data>>>>>", response.data);
        setDataOffers(response.data);
        setIsLoading(false);
      };
      fetchDataOffers();
    } catch (error) {
      console.log("Catch home>>>>", error.response);
    }
  }, [priceMax, search, priceMin, sort]);

  return isLoading ? (
    <div className="downloading">
      Chargement de la page
      <ThreeDots color="#2cb1ba" height={80} width={80} />
    </div>
  ) : (
    <div className="app">
      {/* Hero */}
      <div className="hero">
        <div className="rectangle">
          <h1>Prêts à faire du tri dans vos placards ?</h1>

          <Link to="/publish">
            <button>Commencer à vendre</button>
          </Link>
        </div>

        <img
          className="bandeau"
          src={bandeau}
          alt="femme en train de choisir un vêtement"
        />

        <img className="effet" src={dechirement} alt="effet déchiré" />
      </div>

      {/* Offers */}
      <main className="homeMain">
        {dataOffers.map((offer) => {
          return (
            <div key={offer._id} className="homeOffer">
              <Link to={`/offer/${offer._id}`}>
                {/* owner's infos */}
                <div className="homeUser">
                  {offer.owner?.account.avatar ? (
                    <img
                      className="homeOwnerAvatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt="user avatar"
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="avatar par défaut"
                      className="homeOwnerAvatar"
                    />
                  )}

                  <p>{offer.owner.account.username}</p>
                </div>

                {/* product's infos */}
                <img
                  className="homeProductPicture"
                  src={offer.product_image.picture.secure_url}
                  alt="produit à vendre"
                />

                <p>{offer.product_price} €</p>
                {offer.product_details.map((productDetail, index) => {
                  return (
                    <div key={index}>
                      <p>{productDetail.TAILLE}</p>
                      <p>{productDetail.MARQUE}</p>
                    </div>
                  );
                })}
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
