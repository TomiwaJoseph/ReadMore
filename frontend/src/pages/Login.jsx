import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import { allImages } from "../data";
import NoInternet from "./NoInternet";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const storeContext = useSelector((state) => state.store);
  const {
    currentCategoryData,
    isAuthenticated,
    highestPrice,
    fetchingData,
    noInternet,
  } = storeContext;

  const handleLoginForm = (e) => {
    e.preventDefault();
    signInUser([email, password]);
  };

  const loginDemoUser = () => {
    return;
  };
  const signInUser = (parameters) => {
    return;
  };

  useEffect(() => {
    let selectedRandomImage =
      allImages[Math.floor(Math.random() * allImages.length)];
    setRandomImage(selectedRandomImage);
  }, []);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="login-container container">
      <h1>Login</h1>
      <div className="login-div">
        <div className="product-container">
          <img src={randomImage} alt="random-visual" className="img-fluid" />
        </div>
        <div className="login-block">
          <form onSubmit={handleLoginForm}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              name="email"
              required
              placeholder="Email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              name="password"
              required
              placeholder="Password"
              type="password"
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={loginDemoUser} className="demo-btn" type="submit">
            Demo User
          </button>
          <div className="sign-up-option">
            Don't have an account? {""}
            <NavLink to="/sign-up" className="sign-up">
              sign-up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
