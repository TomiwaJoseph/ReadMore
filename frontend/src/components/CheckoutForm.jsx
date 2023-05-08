import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "../stripe-script";
import "./checkoutform.css";
import { removeCart } from "../redux/actions/fetchers";
import { toast } from "react-toastify";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const notify = (message, errorType) =>
    toast(message, {
      position: "top-center",
      autoClose: "3000",
      pauseOnHover: true,
      closeOnClick: true,
      type: errorType,
      theme: "colored",
    });

  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentFormSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setLoading(true);
      setErrorMsg("");

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email,
        },
      });

      if (error) {
        setLoading(false);
        setErrorMsg(error.message);
      } else {
        stripePaymentMethodHandler({
          amount: props.amount,
          orderInfo: props.orderInfo,
          result: paymentMethod,
        })
          .then((response) => {
            props.setPaymentCompleted(
              response.data.message === "Success" ? true : false
            );
            removeCart();
          })
          .catch((err) => {
            setLoading(false);
            setErrorMsg(err.response.data.error);
          });
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Network communication failed, try again.");
      notify("Your internet connection is bad. Try again later.", "info");
    }
  };

  return (
    <>
      <form onSubmit={handlePaymentFormSubmit} className="stripe-form">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input
              id="cc-name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-email">Email</label>
            <input
              id="cc-email"
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card Number</label>
            <CardNumberElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <hr className="mb-4" />
        <button className="btn w-100" type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border text-light" role="status">
              {/* <span className="sr-only">Loading...</span> */}
            </div>
          ) : (
            `Pay $${props.amount}`
          )}
        </button>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
    </>
  );
};

export default CheckoutForm;
