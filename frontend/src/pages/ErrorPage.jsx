import { useEffect } from "react";
import { Link } from "react-router-dom";
import badUrl from "../static/badUrl.png";

const ErrorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="error__div">
      <div className="error_image_wrapper">
        <img className="img-fluid" src={badUrl} alt="bad url" />
      </div>
      <h1>Unknown url pattern...</h1>
      <p>
        Don't mess with the url. It might take you to where you don't know 😅
      </p>
      <Link className="single__page-error" to="/shop">
        Go Back To Shop
      </Link>
    </div>
  );
};

export default ErrorPage;
