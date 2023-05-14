import { useEffect } from "react";
import badUrl from "../static/error.png";

const NoInternet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="error__div">
      <div className="error_image_wrapper">
        <img className="img-fluid" src={badUrl} alt="bad url" />
      </div>
      <h1>An error occurred...</h1>
      <p>Check your internet connection and try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="single__page-error"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default NoInternet;
