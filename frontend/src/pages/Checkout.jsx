import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoInternet from "./NoInternet";
import Preloader from "../components/Preloader";
import { fetchCartContent } from "../redux/actions/fetchers";
import { setDoneLoading, setInternetError } from "../redux/actions/bookActions";

const PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

const Checkout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    doneLoading,
    noInternet,
    isAuthenticated,
    cartDataToRender,
  } = storeContext;

  const successMessage = () => {
    return (
      <div className="success-msg">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-check2"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <div className="title mb-2">Payment Successful</div>
        <p>
          Your order is in process. You can view your orders in your Dashboard.
          Enjoy reading!
        </p>
        <NavLink to="/user/dashboard">Go to Dashboard</NavLink>
      </div>
    );
  };

  const getCartTotal = () => {
    if (cartDataToRender.length) {
      let allPrices = cartDataToRender
        .map((book) => book.price)
        .reduce((x, y) => x + y);
      return allPrices;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCartContent();
    return () => {
      dispatch(setInternetError(false));
      dispatch(setDoneLoading(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login", { state: { previousPath: pathname } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const showPaymentForm = () => {
    if (!cartDataToRender.length && doneLoading) {
      navigate("/cart");
    } else if (cartDataToRender.length) {
      return (
        <div className="col-md-6 col-lg-6 mx-auto payment-container">
          <h1>Pay Now</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={getCartTotal()}
              setPaymentCompleted={setPaymentCompleted}
            />
          </Elements>
        </div>
      );
    } else {
      <Preloader />;
    }
  };

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="checkout-container container">
      <>{paymentCompleted ? successMessage() : showPaymentForm()}</>
    </div>
  );
};

export default Checkout;
