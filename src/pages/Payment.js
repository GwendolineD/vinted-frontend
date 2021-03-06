import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token }) => {
  const [dataOffer, setDataOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { idOffer } = location.state;

  const stripePromise = loadStripe(
    "pk_test_51JwR3iDsgZzpCktrB9Ra8xSMO5EkQlsoj6RupDA6knzBLxcwelix67XsVhV8SddUt7Ame9LouJVmsgHM9KfVZNvt00RSkstDFG"
  );

  useEffect(() => {
    const fetchDataOffer = async () => {
      try {
        const response = await axios.get(
          `https://vintedlereacteur.herokuapp.com/offer/${idOffer}`
        );
        // console.log("response data >>>", response.data);
        setDataOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Catch payment >>>>>", error.message);
      }
    };
    fetchDataOffer();
  }, [idOffer]);

  return !token ? (
    <Navigate to="/login" state={{ from: `/offer/${idOffer}` }} /> //send id instead of true
  ) : isLoading ? (
    <div className="downloading">
      Chargement de la page
      <ThreeDots color="#2cb1ba" height={80} width={80} />
    </div>
  ) : (
    <Elements stripe={stripePromise}>
      <CheckoutForm dataOffer={dataOffer} />
    </Elements>
  );
};

export default Payment;
