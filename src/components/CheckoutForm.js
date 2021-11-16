import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ dataOffer }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentOK, setPaymentOK] = useState(false);

  const total = dataOffer.product_price + 1.2;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id user",
      });
      //   console.log(stripeResponse.token.id);
      const stripeToken = stripeResponse.token.id;

      const apiResponse = await axios.post("http://localhost:3000/payment", {
        stripeToken,
        // amount: total,
        // description: dataOffer.product_description,
      });
      console.log(apiResponse.data);
      if (apiResponse.data.status === "succeeded") {
        setPaymentOK(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return paymentOK ? (
    <div> paiement effectué !</div>
  ) : (
    <div>
      <h4>Résumé de la commande</h4>
      <div>
        <span>Commande</span> <span>{dataOffer.product_price} €</span>
      </div>
      <div>
        <span>Frais protection acheteurs</span> <span>0.40 €</span>
      </div>
      <div>
        <span>Frais de port</span> <span>0.80 €</span>
      </div>
      <form onSubmit={handleSubmit} className="app">
        <div>
          <span>Total</span> <span>{total} €</span>
        </div>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir
          <span>{dataOffer.product_name}</span>. Vous allez payer{" "}
          <span>{total} €</span> (frais de protection et frais de port inclus)
        </p>
        <CardElement />
        <input type="submit" value="Pay" />
      </form>
    </div>
  );
};

export default CheckoutForm;
