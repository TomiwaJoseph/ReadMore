import { useRef } from "react";
import "./newsletter.css";

const Newsletter = () => {
  let inputRef = useRef(null);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    let email = inputRef.current.value;
    let validate = validateEmail(email);
    console.log(validate);
    // if (validate) {
    //   addToNewsletter(email);
    // } else {
    //   addToNewsletter("badEmail");
    // }
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
      <div className="container">
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
          <i
            onClick={handleNewsletterSubmit}
            className="fas fa-paper-plane"
          ></i>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
