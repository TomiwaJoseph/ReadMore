import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";
import {
  deleteWishlistDress,
  fetchUserOrders,
  fetchWishlistDresses,
  logOutUser,
} from "../redux/actions/fetchers";
import NoInternet from "./NoInternet";
import noThumbnail from "../static/cover_not_found.jpg";
import { setInternetError } from "../redux/actions/bookActions";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    noInternet,
    isAuthenticated,
    wishlistData,
    userInfo,
    wishlistCount,
    userOrderHistory,
  } = storeContext;
  const { first_name, last_name, email } = userInfo;
  const [currentSection, setCurrentSection] = useState(0);
  const [singleOrderDetail, setSingleOrderDetail] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      <Preloader />;
      return navigate("/login", { state: { previousPath: pathname } });
    }
    fetchUserOrders();
    fetchWishlistDresses();
    return () => {
      dispatch(setInternetError(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlistDresses();
  }, [wishlistCount]);

  const handleOrderClick = (code) => {
    let allOrderDiv = document.getElementsByClassName("all-orders")[0];
    let detailsDiv = document.getElementsByClassName("order-details")[0];
    allOrderDiv.classList.add("hide");
    detailsDiv.classList.remove("hide");
    for (let i = 0; i < userOrderHistory.length; i++) {
      let element = userOrderHistory[i];
      if (element["ref_code"] === code) {
        setSingleOrderDetail(element.detail);
        break;
      }
    }
  };

  const handleBackButton = () => {
    let allOrderDiv = document.getElementsByClassName("all-orders")[0];
    let detailsDiv = document.getElementsByClassName("order-details")[0];
    detailsDiv.classList.add("hide");
    allOrderDiv.classList.remove("hide");
  };

  function titleCase(st) {
    return st
      .toLowerCase()
      .split(" ")
      .reduce(
        (s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "),
        ""
      );
  }

  const getTotal = () => {
    if (singleOrderDetail.length) {
      let totalPrice = singleOrderDetail
        .map((book) => book.price)
        .reduce((x, y) => x + y);
      return totalPrice;
    }
  };

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <Preloader />
      ) : (
        <div className="dashboard-container container">
          <h1>Dashboard</h1>
          <div className="dashboard row">
            <div className="col-md-12 col-lg-5">
              <div className="list-group" id="dashboard_sidebar">
                <button
                  onClick={() => setCurrentSection(0)}
                  className={`list-group-item btn btn-outline-info ${
                    currentSection === 0 ? "active" : null
                  }`}
                  id="info_btn"
                >
                  My Info
                </button>
                <button
                  onClick={() => setCurrentSection(1)}
                  className={`list-group-item btn btn-outline-info ${
                    currentSection === 1 ? "active" : null
                  }`}
                  id="order_sidebar_btn"
                >
                  Orders
                </button>
                <button
                  onClick={() => setCurrentSection(2)}
                  className={`list-group-item btn btn-outline-info ${
                    currentSection === 2 ? "active" : null
                  }`}
                  id="wish_sidebar_btn"
                >
                  Wishlist
                </button>
                <button onClick={() => logOutUser()} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
            <div className="col-md-12 col-lg-7">
              {currentSection === 0 && (
                <div className="user-information">
                  <p>
                    First Name:
                    <span className="text-muted"> {first_name}</span>
                  </p>
                  <p>
                    Last Name:
                    <span className="text-muted"> {last_name}</span>
                  </p>
                  <p>
                    Email:
                    <span className="text-muted"> {email}</span>
                  </p>
                </div>
              )}
              {currentSection === 1 && (
                <div className="order-info-container">
                  {userOrderHistory.length ? (
                    <>
                      <div className="all-orders">
                        <h3>Order History</h3>
                        <div className="order-div">
                          {userOrderHistory.map((order) => (
                            <button
                              key={order.ref_code}
                              onClick={() => handleOrderClick(order.ref_code)}
                              className="btn"
                            >
                              {order.ref_code}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="order-details hide">
                        <i
                          onClick={handleBackButton}
                          className="fa fa-arrow-left"
                        ></i>
                        <div className="order-information">
                          {singleOrderDetail.map((book, index) => (
                            <>
                              <div key={index} className="book-info">
                                <div className="col-md-4 text-center">
                                  <span>
                                    {titleCase(book.title.replaceAll("-", " "))}
                                  </span>
                                </div>
                                <div className="col-md-4 text-center">
                                  <span>{book.author}</span>
                                </div>
                                <div className="col-md-4 text-right">
                                  <span>$ {book.price}</span>
                                </div>
                              </div>
                            </>
                          ))}
                          <hr />
                          <div className="order-total-div">
                            <div>Total</div>
                            <div>$ {getTotal()}</div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="empty-order-history">
                      <h3>You have no orders yet.</h3>
                    </div>
                  )}
                </div>
              )}
              {currentSection === 2 && (
                <>
                  <div className="wishlist-container">
                    <div className="row">
                      {wishlistData.length ? (
                        <>
                          {wishlistData.map((book) => (
                            <div key={book.id} className="col-md-4 col-6">
                              <div className="wishlist-img-container">
                                <NavLink to={`/shop/${book.name}/${book.isbn}`}>
                                  <img
                                    src={
                                      book.has_cover
                                        ? "https://covers.openlibrary.org/b/isbn/" +
                                          book.isbn +
                                          "-M.jpg"
                                        : noThumbnail
                                    }
                                    className="img-fluid"
                                    alt={book.name}
                                  />
                                </NavLink>
                              </div>
                              <button
                                className="delete-wishlist-btn"
                                onClick={() => {
                                  deleteWishlistDress(book.isbn);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="empty-wishlist">
                          <h3>No book in your wishlist.</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
