import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const [dataOffer, setDataOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { idOffer } = location.state;
  console.log("id >>>", idOffer);
  const stripePromise = loadStripe(
    "pk_test_51JwR3iDsgZzpCktrB9Ra8xSMO5EkQlsoj6RupDA6knzBLxcwelix67XsVhV8SddUt7Ame9LouJVmsgHM9KfVZNvt00RSkstDFG"
  );

  useEffect(() => {
    const fetchDataOffer = async () => {
      try {
        const response = await axios.get(
          `https://vintedlereacteur.herokuapp.com/offer/${idOffer}`
        );

        setDataOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataOffer();
  }, [idOffer]);

  console.log(dataOffer);
  return isLoading ? (
    <p>Page is downloading ...</p>
  ) : (
    <Elements stripe={stripePromise}>
      <CheckoutForm dataOffer={dataOffer} />
    </Elements>
  );
};

export default Payment;
