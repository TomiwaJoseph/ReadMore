import { useRef } from "react";
import "./newsletter.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  let inputRef = useRef(null);
  const notify = (message, errorType) =>
    toast(message, {
      position: "top-right",
      autoClose: "3000",
      pauseOnHover: true,
      closeOnClick: true,
      type: errorType,
      theme: "colored",
    });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    let email = inputRef.current.value;
    let validate = validateEmail(email);
    if (validate) {
      notify(
        "You have been successfully added to our newsletter list.",
        "success"
      );
      inputRef.current.value = "";
    } else {
      return notify("Please enter a proper email", "info");
    }
  };

  const validateEmail = (email) => {
    if (
      !/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9/-]+\.)+[A-Za-z]{2,4}$/i.test(email)
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="newsletter">
      <h2>Subscribe To Our READMORE Newsletter now!</h2>
      <hr />
      <p>
        Receive email notification on latest books as well as discount prices.
      </p>
      <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
        <input
          ref={inputRef}
          className="form-control"
          type="text"
          name="email"
          id="email"
        />
        <i onClick={handleNewsletterSubmit} className="fas fa-paper-plane"></i>
      </form>
    </div>
  );
};

export default Newsletter;
