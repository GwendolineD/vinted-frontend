import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import bandeau from "../assets/img/banner.jpg";

const Home = ({ search, priceMax, priceMin, sort }) => {
  const [dataOffers, setDataOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let sortChoice = "price_asc";
    if (!sort) {
      sortChoice = "price_desc";
    }
    // } else {
    //   sortChoice = "price_asc";
    // }

    try {
      const fetchDataOffers = async () => {
        const response = await axios.get(
          `https://vintedlereacteur.herokuapp.com/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sortChoice}` //mon API
          // `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}` // l'API du reacteur
        );
        setDataOffers(response.data); //avec mon API
        // setDataOffers(response.data.offers); // avec l'API du reacteur
        setIsLoading(false);
        // console.log(response.data);
      };
      fetchDataOffers();
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  }, [priceMax, search, priceMin, sort]);

  return isLoading ? (
    <div className="downloading">Page is dowloading ...</div>
  ) : (
    <div className="app">
      <div className="hero">
        <img src={bandeau} alt="" />
      </div>

      <main className="homeMain">
        {dataOffers.map((offer) => {
          return (
            <div key={offer._id} className="homeOffer">
              <Link to={`/offer/${offer._id}`}>
                <div className="homeUser">
                  {offer.owner.account.avatar && (
                    <img
                      className="homeOwnerAvatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt="user avatar"
                    />
                  )}

                  <p>{offer.owner.account.username}</p>
                </div>

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
