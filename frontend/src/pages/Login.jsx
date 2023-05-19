import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import { allImages } from "../data";
import NoInternet from "./NoInternet";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  authenticateUser,
  loginDemoUser,
  signInUser,
} from "../redux/actions/fetchers";
import {
  setInternetError,
  setUserIsAuthenticated,
} from "../redux/actions/bookActions";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [randomImage, setRandomImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doneLoading, setDoneLoading] = useState(false);
  const storeContext = useSelector((state) => state.store);
  const { isAuthenticated, fetchingData, noInternet } = storeContext;

  const handleLoginForm = (e) => {
    e.preventDefault();
    if (state) {
      let checkAttachment = state.hasOwnProperty("action");
      if (checkAttachment) {
        return signInUser([email, password, state.nameISBN]);
      } else {
        return signInUser([email, password]);
      }
    } else {
      return signInUser([email, password]);
    }
  };

  const handleDemoLogin = () => {
    if (state) {
      let checkAttachment = state.hasOwnProperty("action");
      if (checkAttachment) {
        return loginDemoUser(state.nameISBN);
      } else {
        loginDemoUser();
      }
    } else {
      loginDemoUser();
    }
  };

  useEffect(() => {
    const authenticateUrl =
      "https://tomiwajoseph.pythonanywhere.com/api/auth/check-authentication";
    let previousUrl = state?.previousPath || "/user/dashboard";

    authenticateUser(authenticateUrl, (status) => {
      dispatch(setUserIsAuthenticated(status.data.authenticated));
      if (status.data.authenticated === false) {
        setDoneLoading(true);
      } else {
        navigate(previousUrl);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    let selectedRandomImage =
      allImages[Math.floor(Math.random() * allImages.length)];
    setRandomImage(selectedRandomImage);
    return () => {
      dispatch(setInternetError(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let previousUrl = state?.previousPath || "/user/dashboard";
    if (isAuthenticated) {
      navigate(previousUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      {!doneLoading ? (
        <Preloader />
      ) : (
        <div className="login-container">
          <h1>Login</h1>
          <div className="login-div">
            <div className="product-container">
              <img
                src={randomImage}
                alt="random-visual"
                className="img-fluid"
              />
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
              <button onClick={handleDemoLogin} className="demo-btn">
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
      )}
    </>
  );
};

export default Login;
