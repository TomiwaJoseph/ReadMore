import axios from "axios";

const API_ENDPOINT = "https://tomiwajoseph.pythonanywhere.com/api";

export const stripePaymentMethodHandler = async (data) => {
  const { amount, result } = data;
  let body = JSON.stringify({
    payment_method_id: result.id,
    name: result.billing_details.name,
    email: result.billing_details.email,
    amount: amount,
    token: localStorage.getItem("readMoreToken"),
  });
  const res = await axios.post(`${API_ENDPOINT}/save-stripe-info/`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
