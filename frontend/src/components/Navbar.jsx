import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    if (!click) {
      document.body.style["overflow"] = "hidden";
    } else {
      document.body.style["overflow"] = "auto";
    }
  };
  const closeMobileMenu = () => {
    setClick(false);
    document.body.style["overflow"] = "auto";
  };
  const storeContext = useSelector((state) => state.store);
  const { isAuthenticated, cartCount } = storeContext;

  useEffect(() => {
    const onScroll = () => {
      let scroll = window.pageYOffset;
      let navbar = document.getElementsByClassName("the-navbar")[0];

      if (scroll > 450) {
        if (!navbar.classList.contains("fix-navbar")) {
          navbar.classList.add("fix-navbar");
        }
      } else {
        navbar.classList.remove("fix-navbar");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let inputEntry = e.target.name.value.replaceAll(" ", "-");
    closeMobileMenu();
    navigate("/shop/search", { state: { searchValue: inputEntry } });
  };

  return (
    <>
      <nav className={click ? "nav-clicked the-navbar" : "the-navbar"}>
        <div className="nav-left">
          <NavLink onClick={closeMobileMenu} to="/">
            <h2>
              Read<em>More</em>
            </h2>
          </NavLink>
        </div>
        <div className="mobile-icons">
          <NavLink
            id="navbar-search"
            onClick={closeMobileMenu}
            to="/shop/search"
          >
            <i className="fa fa-search"></i>
          </NavLink>
          <NavLink to="/cart" className="cartIcon">
            <div className="cart__wrapper">
              <i className="fa fa-shopping-bag"></i>
              <span>{cartCount}</span>
            </div>
          </NavLink>
          <i
            onClick={handleClick}
            className={click ? "fa fa-times" : "fa fa-align-right"}
          ></i>
        </div>
        <div className={click ? "nav-menu active" : "nav-menu"}>
          <div className="desktop-links">
            <NavLink
              onClick={closeMobileMenu}
              id="home"
              className="nav-link"
              to="/"
            >
              Home
            </NavLink>
            <NavLink onClick={closeMobileMenu} className="nav-link" to="/shop">
              Shop
            </NavLink>
            <NavLink
              onClick={closeMobileMenu}
              className="nav-link"
              to="/contact-us"
            >
              Contact
            </NavLink>
            {isAuthenticated ? (
              <NavLink
                onClick={closeMobileMenu}
                className="nav-link"
                to="/user/dashboard"
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                onClick={closeMobileMenu}
                id="login"
                className="nav-link"
                to="/login"
              >
                Login
              </NavLink>
            )}
          </div>
          <div className="mobile-links">
            <form onSubmit={handleSearch} className="search_form">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="search for book"
              />
              <button className="" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="nav-right">
          <NavLink to="/cart" className="cartIcon">
            <div className="cart__wrapper">
              <i className="fas fa-shopping-bag"></i>
              <span>{cartCount}</span>
            </div>
          </NavLink>
          <NavLink to="/shop/search">
            <i className="fas fa-search"></i>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
