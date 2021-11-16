import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

import axios from "axios";

const CheckoutForm = ({ dataOffer }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentOK, setPaymentOK] = useState(false);

  const total = dataOffer.product_price + 1.2;
  const amount = (total * 10000) / 100;
  //   console.log(amount);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id user",
      });
      //   console.log(stripeResponse.token.id);
      const stripeToken = stripeResponse.token.id;

      const apiResponse = await axios.post(
        "https://vintedlereacteur.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          amount: amount,
          description: dataOffer.product_description,
        }
      );
      console.log(apiResponse.data);
      if (apiResponse.data.status === "succeeded") {
        setPaymentOK(true);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.apiResponse);
    }
  };

  return paymentOK ? (
    <div className="paymentValid app">
      <div>
        Votre paiement de <span>{total} €</span> pour l'achat de{" "}
        <span>{dataOffer.product_name}</span> a été effectué avec succès!
      </div>
      <Link to="/">Revenir aux offres</Link>
    </div>
  ) : (
    <div className=" paymentPage app">
      <div className="commande">
        <h4>Résumé de la commande</h4>
        <div className="recap">
          <span>Commande</span> <span>{dataOffer.product_price} €</span>
        </div>
        <div className="recap">
          <span>Frais protection acheteurs</span> <span>0.40 €</span>
        </div>
        <div className="recap">
          <span>Frais de port</span> <span>0.80 €</span>
        </div>
        <form onSubmit={handleSubmit} className="app">
          <div className="totalPayment">
            <span>Total</span> <span>{total} €</span>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span>{dataOffer.product_name}</span>. Vous allez payer{" "}
            <span>{total} €</span> (frais de protection et frais de port inclus)
          </p>
          <CardElement className="cardElement" />
          <input type="submit" value="Pay" />
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
