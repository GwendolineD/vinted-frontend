import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        console.log(error.message);
      }
    };
    fetchDataOffer();
  }, [offerId]);

  // console.log(offerId);

  return isLoading ? (
    <p>Page is downloading ...</p>
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
            <div className="offerOwner">
              {dataOffer.owner.account.avatar === undefined ? (
                <span></span>
              ) : (
                <img
                  className="offerOwnerAvatar"
                  src={dataOffer.owner.account.avatar.secure_url}
                  alt="user avatar"
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
