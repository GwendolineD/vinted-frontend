import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import avatar from "../assets/img/defaultAvatar.png";

const Offer = () => {
  const { offerId } = useParams();
  const [dataOffer, setDataOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataOffer = async () => {
      try {
        const response = await axios.get(
          `https://vintedlereacteur.herokuapp.com/offer/${offerId}`
        );

        setDataOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Catch offer >>>>>", error.message);
      }
    };
    fetchDataOffer();
  }, [offerId]);

  return isLoading ? (
    <div className="downloading">
      Chargement de la page
      <ThreeDots color="#2cb1ba" height={80} width={80} />
    </div>
  ) : (
    <div className="app">
      <main className="mainOffer">
        <div className="offerPicture">
          <img
            src={dataOffer.product_image.picture.secure_url}
            alt="produit à vendre"
          />
        </div>

        <aside className="offerAside">
          {/* offer's details */}
          <div className="offerAsideFirstpart">
            <p>{dataOffer.product_price} €</p>
            <div>
              <div>
                {dataOffer.product_details.map((productDetail, index) => {
                  return <p key={index}> {[Object.keys(productDetail)[0]]}</p>;
                })}
              </div>
              <div>
                {dataOffer.product_details.map((productDetail, index) => {
                  return (
                    <p key={index}>
                      {productDetail[Object.keys(productDetail)]}{" "}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="offerAsideSecondpart">
            <p>{dataOffer.product_name}</p>
            <p>{dataOffer.product_description}</p>

            {/* Owner infos */}
            <div className="offerOwner">
              {dataOffer.owner.account.avatar ? (
                <img
                  className="offerOwnerAvatar"
                  src={dataOffer.owner.account.avatar.secure_url}
                  alt="user avatar"
                />
              ) : (
                <img
                  src={avatar}
                  alt="avatar par défaut"
                  className="homeOwnerAvatar"
                />
              )}
              <span>{dataOffer.owner.account.username}</span>
            </div>
          </div>

          <Link to="/payment" state={{ idOffer: offerId }}>
            <button>Acheter</button>
          </Link>
        </aside>
      </main>
    </div>
  );
};

export default Offer;
