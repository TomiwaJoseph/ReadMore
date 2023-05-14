import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Newsletter from "../components/Newsletter";
import Preloader from "../components/Preloader";
import { setDoneLoading } from "../redux/actions/bookActions";
import {
  fetchCartContent,
  removeCart,
  removeCartItem,
} from "../redux/actions/fetchers";
import emptyCart from "../static/empty-cart.png";
import noThumbnail from "../static/no-thumbnail.jpg";
import NoInternet from "./NoInternet";

const Cart = () => {
  const dispatch = useDispatch();
  const storeContext = useSelector((state) => state.store);
  const { cartDataToRender, doneLoading, cartCount, noInternet, fetchingData } =
    storeContext;

  const getTotal = () => {
    let allPrices = cartDataToRender
      .map((book) => book.price)
      .reduce((x, y) => x + y);
    return allPrices;
  };

  function titleCase(st) {
    // console.log("titlecase function is called...");
    // console.log("changing... ", st);
    // console.log("");
    return st
      .toLowerCase()
      .split(" ")
      .reduce(
        (s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "),
        ""
      );
  }

  const renderCartData = () => {
    if (cartCount === 0 && doneLoading) {
      return (
        <div className="empty-cart">
          <div className="empty-cart-image-wrapper">
            <img src={emptyCart} alt="empty-cart" />
          </div>
          <h3>Cart is Empty</h3>
          <NavLink to="/shop">Go Shopping</NavLink>
        </div>
      );
    } else if (cartCount !== 0 && doneLoading) {
      return (
        <div className="col-md-8">
          {/* <div className="order-header">
            <p className="text-muted">YOUR ORDER</p>
            <hr className="my-2" />
          </div> */}
          {cartDataToRender.map((book) => (
            <div key={book.id} className="row cart-book-container">
              <div className="col-md-8 col-8">
                <div className="cart-image-container">
                  <img
                    className="img-fluid"
                    alt={book.title}
                    src={
                      book.has_cover
                        ? "https://covers.openlibrary.org/b/isbn/" +
                          book.isbn +
                          "-M.jpg"
                        : // "https://i.imgur.com/6oHix28.jpg"
                          noThumbnail
                    }
                  />
                  <div className="book-detail">
                    <p className="mb-0">
                      <b>{titleCase(book.title.replaceAll("-", " "))}</b>
                    </p>
                    <small className="text-muted">{book.author}</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3">
                <div className="cart-price-container">
                  <p>
                    <b>$ {book.price}</b>
                  </p>
                </div>
              </div>
              <div className="col-md-1 col-1">
                <div className="cart-icon-container">
                  <p
                    onClick={() => removeCartItem(book.isbn)}
                    className="boxed-1"
                  >
                    <i className="fa fa-trash text-danger"></i>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <hr /> */}
          <div className="total-container">
            <p className="total">Grand Total</p>
            <p className="total-price">${getTotal()}</p>
          </div>
          <hr className="mt-0" />
          <button onClick={() => removeCart()} className="btn clear-cart">
            CLEAR CART
          </button>
          <div className="cart-cta">
            <NavLink to="/shop" className="btn back-btn">
              <i className="fa fa-arrow-left mr-3"></i>
              Back to Shop
            </NavLink>
            <NavLink to="/shop/checkout" className="btn checkout-btn">
              Proceed to Checkout <i className="fa fa-arrow-right ml-3"></i>
            </NavLink>
          </div>

          {/* <div>
            {cartDataToRender.map((book) => (
              <>
                <div key={book.id} className="row justify-content-between">
                  <div className="col-auto col-md-7">
                    <div className="media flex-column flex-sm-row">
                      <img
                        className=" img-fluid"
                        src="https://i.imgur.com/6oHix28.jpg"
                        width="62"
                        height="62"
                      />
                      <div className="media-body  my-auto">
                        <div className="row ">
                          <div className="col-auto">
                            <p className="mb-0">
                              <b>
                                {titleCase(book.title.replaceAll("-", " "))}
                              </b>
                            </p>
                            <small className="text-muted">{book.author}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pl-0 flex-sm-col col-auto my-auto ">
                    <p>
                      <b>$ {Math.floor(Math.random() * (200 - 40) + 40)}</b>
                    </p>
                  </div>
                  <div className="pl-0 flex-sm-col col-auto my-auto">
                    <p
                      onClick={() => removeCartItem(book.name)}
                      className="boxed-1"
                    >
                      <i className="fa fa-trash text-danger"></i>
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
              </>
            ))}
            <button onClick={() => removeCart()} className="btn clear-cart">
              CLEAR CART
            </button>
            <div className="cart-cta">
              <NavLink to="/shop" className="btn back-btn">
                <i className="fa fa-arrow-left mr-3"></i>
                Back to Shop
              </NavLink>
              <NavLink to="/shop/checkout" className="btn checkout-btn">
                Proceed to Checkout <i className="fa fa-arrow-right ml-3"></i>
              </NavLink>
            </div>
          </div> */}
        </div>
      );
    } else {
      <Preloader />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(setDoneLoading(false));
    };
  }, []);

  useEffect(() => {
    fetchCartContent();
  }, [cartCount]);

  // useEffect(() => {
  //   setCartTotal(cartDataToRender);
  // }, [cartDataToRender]);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="cart-container container">
      <h1>Cart</h1>
      <hr className="underline" />
      {renderCartData()}
      <Newsletter />
    </div>
  );
};

export default Cart;
