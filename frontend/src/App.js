import "./App.css";
import "../src/pages/page-styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./pages/Dashboard";
import store from "./redux/store/store";
import { fetchUser } from "./redux/actions/auth";
import { setUserIsAuthenticated } from "./redux/actions/bookActions";
import { useEffect } from "react";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const App = () => {
  const getUserUrl = "http://localhost:8000/api/auth/user/";

  useEffect(() => {
    fetchUser(getUserUrl, (status) => {
      store.dispatch(setUserIsAuthenticated(status));
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:bookName/:bookIsbn" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Checkout />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop/search" element={<Search />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
