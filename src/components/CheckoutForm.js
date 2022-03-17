import { useState } from "react";
import { Link } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const CheckoutForm = ({ dataOffer }) => {
  const [paymentOK, setPaymentOK] = useState(false);
  const [payementInAction, setPayementInAction] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const total = dataOffer.product_price + 1.2;
  const amount = (total * 10000) / 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPayementInAction(true);
    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id user",
      });
      const stripeToken = stripeResponse.token.id;

      const apiResponse = await axios.post(
        "https://vintedlereacteur.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          amount: amount,
          description: dataOffer.product_description,
        }
      );
      // console.log(apiResponse.data);

      if (apiResponse.data.status === "succeeded") {
        setPaymentOK(true);
      }
    } catch (error) {
      console.log("Catch checkoutForm>>>>", error.apiResponse);
    }
    setPayementInAction(false);
  };

  return paymentOK ? (
    <div className="paymentValidContainer">
      <div className="paymentValid app">
        <div>
          Votre paiement de <span>{total} €</span> pour l'achat de{" "}
          <span> {dataOffer.product_name}</span> a été effectué avec succès!
        </div>
        <Link to="/">Revenir aux offres</Link>
      </div>
    </div>
  ) : (
    <div className=" paymentPage app">
      <div className="commande">
        <h4>Résumé de la commande</h4>

        <div>
          <div className="recap">
            <span>Commande</span> <span>{dataOffer.product_price} €</span>
          </div>

          <div className="recap">
            <span>Frais protection acheteurs</span> <span>0.40 €</span>
          </div>

          <div className="recap">
            <span>Frais de port</span> <span>0.80 €</span>
          </div>
        </div>

        <div className="totalPayment">
          <span>Total</span> <span>{total} €</span>
        </div>

        <form onSubmit={handleSubmit} className="app">
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir
            <span> {dataOffer.product_name}</span>. Vous allez payer
            <span> {total} €</span> (frais de protection et frais de port
            inclus)
          </p>

          <CardElement className="cardElement" />

          {payementInAction ? (
            <div style={{ width: "100%", textAlign: "center", marginTop: 20 }}>
              <RotatingLines width="30" strokeColor="#2cb1ba" />
            </div>
          ) : (
            <input type="submit" value="Pay" />
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
