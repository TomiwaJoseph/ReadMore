import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";
import { authenticateUser, signUpUser } from "../redux/actions/fetchers";
import NoInternet from "./NoInternet";
import {
  setInternetError,
  setUserIsAuthenticated,
} from "../redux/actions/bookActions";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, noInternet, isAuthenticated } = storeContext;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [doneLoading, setDoneLoading] = useState(false);
  const notify = (message, errorType) =>
    toast(message, {
      position: "top-right",
      autoClose: "3000",
      pauseOnHover: true,
      closeOnClick: true,
      type: errorType,
      theme: "colored",
    });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      notify("Both passwords don't match", "error");
    } else {
      signUpUser([firstName, lastName, email, password]);
    }
  };

  useEffect(() => {
    const authenticateUrl =
      "http://tomiwajoseph.pythonanywhere.com/api/auth/check-authentication";
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
    let previousUrl = state?.previousPath || "/user/dashboard";
    if (isAuthenticated) {
      navigate(previousUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      dispatch(setInternetError(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="signup-container">
          <h1>SignUp</h1>
          <div className="signup-block">
            <form onSubmit={handleSignUpSubmit}>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                name="firstName"
                required
                placeholder="First Name"
                type="text"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                name="lastName"
                required
                placeholder="Last Name"
                type="text"
              />
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
              <input
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="form-control"
                name="repeatPassword"
                required
                placeholder="Repeat Password"
                type="password"
              />
              <button type="submit">Sign Up</button>
            </form>
            <div className="sign-in-option">
              Already have an account? {""}
              <NavLink to="/login" className="sign-up">
                sign in
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
