import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Preloader from "../components/Preloader";
import noThumbnail from "../static/cover_not_found.jpg";
import { addToCart, fetchSingleBook } from "../redux/actions/fetchers";
import {
  removeSingleBookData,
  setBadRequest,
  setInternetError,
} from "../redux/actions/bookActions";
import NoInternet from "./NoInternet";
import Categories from "../components/Categories";

const SingleProduct = () => {
  const { bookIsbn } = useParams();
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, badRequest, noInternet, singleBookData } = storeContext;
  const { title, cover_i, author_name, subject } = singleBookData;
  const dispatch = useDispatch();

  const selectedCartAuthor = (authors) => {
    let bookAuthor = "";
    if (authors.length === 1) {
      bookAuthor = authors[0];
    } else if (authors.length === 2) {
      bookAuthor = authors[0] + " & " + authors[1];
    } else {
      bookAuthor = authors[0] + " et. al.";
    }
    return bookAuthor;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSingleBook(bookIsbn);
    return () => {
      dispatch(setBadRequest(false));
      dispatch(setInternetError(false));
      dispatch(removeSingleBookData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIsbn]);

  function titleCase(st) {
    return st
      .toLowerCase()
      .split(" ")
      .reduce(
        (s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "),
        ""
      );
  }

  const getAuthorAndGenre = () => {
    let bookAuthor = "";
    let bookGenre = "";
    if (subject) {
      for (let i = 0; i < subject.length; i++) {
        if (subject[i].toLowerCase() === "textbook") {
          bookGenre = titleCase(subject[i]);
          break;
        } else if (subject[i].toLowerCase() === "programming languages") {
          bookGenre = titleCase(subject[i]);
          break;
        } else if (subject[i].toLowerCase() === "mystery") {
          bookGenre = titleCase(subject[i]);
          break;
        } else if (subject[i].toLowerCase() === "horror") {
          bookGenre = titleCase(subject[i]);
          break;
        } else if (subject[i].toLowerCase() === "adventure") {
          bookGenre = titleCase(subject[i]);
          break;
        } else if (subject[i].toLowerCase() === "thriller") {
          bookGenre = titleCase(subject[i]);
          break;
        }
      }
    }

    if (bookGenre === "") {
      bookGenre = "Unknown";
    }

    if (author_name.length === 1) {
      bookAuthor = author_name[0];
    } else if (author_name.length === 2) {
      bookAuthor = author_name[0] + " & " + author_name[1];
    } else {
      bookAuthor = author_name[0] + " et. al.";
    }

    return (
      <p className="author">
        {bookAuthor} - <span>{bookGenre}</span>
      </p>
    );
  };

  if (fetchingData) {
    return <Preloader />;
  }

  if (badRequest) {
    return <ErrorPage />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      {Object.keys(singleBookData).length === 0 ? (
        <Preloader />
      ) : (
        <>
          <div className="single-product-container container">
            <div className="single-product-row">
              <div className="single-product-img">
                <img
                  src={
                    cover_i
                      ? "https://covers.openlibrary.org/b/id/" +
                        cover_i +
                        "-M.jpg"
                      : noThumbnail
                  }
                  className="img-fluid"
                  alt={title}
                />
              </div>
              <div className="product-detail-container">
                <h2>{title}</h2>
                {getAuthorAndGenre()}
                <div className="price-atc">
                  <p className="item-price">
                    $ {Math.floor(Math.random() * (200 - 40) + 40)}
                  </p>
                  <button
                    onClick={() =>
                      addToCart([
                        title.toLowerCase().replaceAll(" ", "-"),
                        selectedCartAuthor(author_name),
                        singleBookData["isbn"][0],
                        cover_i ? true : false,
                      ])
                    }
                    className="btn"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="item-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  non, modi eaque ratione mollitia quae doloribus facere,
                  reiciendis fugiat autem a quasi repudiandae vero porro
                  repellat? Quos consectetur adipisci, eaque repudiandae nulla
                  nam voluptas. Eum, aut magnam. Dicta sapiente, laudantium
                  veniam maxime adipisci recusandae expedita temporibus iure
                  tenetur nam eum.
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <Categories />
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
