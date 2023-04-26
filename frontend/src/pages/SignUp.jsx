import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";
import NoInternet from "./NoInternet";

const SignUp = () => {
  const navigate = useNavigate();
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, noInternet, isAuthenticated } = storeContext;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      return;
      // notify("Both passwords don't match", "error");
    } else {
      signUpUser([firstName, lastName, email, password]);
    }
  };

  const signUpUser = (parameters) => {
    return;
  };

  if (isAuthenticated) {
    return navigate("/");
  }

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="signup-container container">
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
  );
};

export default SignUp;
