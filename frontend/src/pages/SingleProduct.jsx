import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Preloader from "../components/Preloader";
import noThumbnail from "../static/no-thumbnail.jpg";
import { fetchSingleBook } from "../redux/actions/fetchers";
import { setBadRequest, setInternetError } from "../redux/actions/bookActions";
import NoInternet from "./NoInternet";

const SingleProduct = () => {
  const { bookName, bookISBN } = useParams();
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, badRequest, noInternet, singleBookData } = storeContext;
  const { title, cover_i, author_name, subject } = singleBookData;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSingleBook(bookName);
    return () => {
      dispatch(setBadRequest(false));
      dispatch(setInternetError(false));
    };
  }, [bookName]);

  const getAuthorAndGenre = () => {
    let bookAuthor = "";
    let bookGenre = "";
    for (let i = 0; i < subject.length; i++) {
      if (subject[i].toLowerCase() === "textbook") {
        bookGenre = subject[i];
        break;
      } else if (subject[i].toLowerCase() === "programming languages") {
        bookGenre = subject[i];
        break;
      } else if (subject[i].toLowerCase() === "history") {
        bookGenre = subject[i];
        break;
      } else if (subject[i].toLowerCase() === "biography") {
        bookGenre = subject[i];
        break;
      } else if (subject[i].toLowerCase() === "adventure") {
        bookGenre = subject[i];
        break;
      } else if (subject[i].toLowerCase() === "fantasy") {
        bookGenre = subject[i];
        break;
      }
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

              <p className="item-price">
                $ {Math.floor(Math.random() * (200 - 40) + 40)}
              </p>
              <p className="item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                non, modi eaque ratione mollitia quae doloribus facere,
                reiciendis fugiat autem a quasi repudiandae vero porro repellat?
                Quos consectetur adipisci, eaque repudiandae nulla nam voluptas.
                Eum, aut magnam. Dicta sapiente, laudantium veniam maxime
                adipisci recusandae expedita temporibus iure tenetur nam eum.
              </p>
              <button className="btn">Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
