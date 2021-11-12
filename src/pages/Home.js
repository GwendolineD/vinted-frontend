import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// import Offer from "./Offer";

import bandeau from "../assets/img/banner.jpg";

const Home = () => {
  const [dataOffers, setDataOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchDataOffers = async () => {
        const response = await axios.get(
          "https://vintedlereacteur.herokuapp.com/offers"
          // "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setDataOffers(response.data);
        setIsLoading(false);
        // console.log(response.data);
      };
      fetchDataOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading ? (
    <div className="downloading">Page is dowloading ...</div>
  ) : (
    <div className="app">
      <div className="hero">
        <img src={bandeau} alt="" />
      </div>

      <main className="homeMain">
        {dataOffers.map((offer, index) => {
          return (
            <div key={offer._id} className="homeOffer">
              <Link to={`/offer/${offer._id}`}>
                <div className="homeUser">
                  <img
                    className="homeOwnerAvatar"
                    src={offer.owner.account.avatar.secure_url}
                    alt="user avatar"
                  />
                  <p>{offer.owner.account.username}</p>
                </div>

                <img
                  className="homeProductPicture"
                  src={offer.product_image.secure_url}
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
