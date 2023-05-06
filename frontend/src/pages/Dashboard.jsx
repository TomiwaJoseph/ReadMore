import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";
import {
  deleteWishlistDress,
  fetchUserOrders,
  fetchWishlistDresses,
  logOutUser,
} from "../redux/actions/fetchers";
import NoInternet from "./NoInternet";
import noThumbnail from "../static/no-thumbnail.jpg";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    noInternet,
    isAuthenticated,
    wishlistData,
    userInfo,
    wishlistCount,
    userOrderHistory,
    backendUrl,
  } = storeContext;
  const { first_name, last_name, email } = userInfo;
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      <Preloader />;
      return navigate("/login", { state: { previousPath: pathname } });
    }
    fetchUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlistDresses();
  }, [wishlistCount]);

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
            <div className="col-md-5">
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
            <div className="col-md-7">
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
                <>
                  <div className="order-container">
                    {userOrderHistory.length ? (
                      <>
                        <h3>Order History</h3>
                        {userOrderHistory.map((order) => (
                          <div key={order.ref_code} className="order__div">
                            <p>{order.start_date}</p>
                            <NavLink
                              to={`/user/track-order/${order.ref_code}`}
                              className={`order__tracker_btn ${
                                order.delivered ? "delivered" : "processing"
                              }`}
                            >
                              {order.ref_code}
                            </NavLink>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="empty__order_history">
                        <h3>You have no orders yet.</h3>
                      </div>
                    )}
                  </div>
                </>
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
                          <h3>No dress in your wishlist.</h3>
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
