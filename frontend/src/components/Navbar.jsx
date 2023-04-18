import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
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
  const { isAuthenticated } = storeContext;

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
    // console.log(e.target.searchValue.value);
    // searchBookByName(e.target.searchValue.value)
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
          <NavLink to="/apartments">
            <i onClick={closeMobileMenu} className="fa fa-home"></i>
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
            <form className="search_form">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
              />
              <button className="" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="nav-right">
          <form className="search_form" onSubmit={handleSearch}>
            <input
              type="text"
              name="searchValue"
              className="form-control"
              placeholder="Search here..."
            />
            <button type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
