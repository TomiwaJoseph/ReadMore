import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addToCart, addToWishlist } from "../redux/actions/fetchers";
import "./categorypluspagination.css";
import noThumbnail from "../static/cover_not_found.jpg";

const SearchResultPlusPagination = ({ data, isAuthenticated }) => {
  const navigate = useNavigate();
  const dataToRender = data;
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 0;

  if (window.innerWidth > 1024) {
    itemsPerPage = 12;
  } else {
    itemsPerPage = 9;
  }

  const handleWishlistClick = (nameISBN) => {
    if (isAuthenticated) {
      addToWishlist(nameISBN);
    } else {
      navigate("/login", {
        state: { nameISBN: nameISBN, action: "wishlist" },
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const pageNumberLimit = 3;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(dataToRender.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToRender.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          id={number}
          key={number}
          onClick={handleClick}
          className={currentPage === number ? "numbers active" : "numbers"}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

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

  const getAuthor = (authors) => {
    let bookAuthor = "";
    if (authors) {
      if (authors.length === 1) {
        bookAuthor = authors[0];
      } else if (authors.length === 2) {
        bookAuthor = authors[0] + " & " + authors[1];
      } else {
        bookAuthor = authors[0] + " et. al.";
      }
    }
    return <p>{bookAuthor}</p>;
  };

  return (
    <>
      <div className="container">
        <div className="row category-container">
          {currentItems &&
            currentItems.map((book, index) => (
              <div key={index} className="col-md-4 col-lg-4 col-xl-3">
                <div className="product-image">
                  <img
                    src={
                      book.cover_i
                        ? "https://covers.openlibrary.org/b/id/" +
                          book.cover_i +
                          "-M.jpg"
                        : noThumbnail
                    }
                    className="img-fluid"
                    alt={book.title}
                  />
                  <div className="hidden-cta">
                    <i
                      onClick={() =>
                        addToCart([
                          book.title.toLowerCase().replaceAll(" ", "-"),
                          selectedCartAuthor(book.author_name),
                          book.isbn[0],
                          book.cover_i ? true : false,
                        ])
                      }
                      className="fas fa-shopping-bag"
                    ></i>
                    <i
                      onClick={() =>
                        handleWishlistClick([
                          book.title.toLowerCase().replaceAll(" ", "-"),
                          book.isbn[0],
                          book.cover_i ? true : false,
                        ])
                      }
                      className="fas fa-heart"
                    ></i>
                  </div>
                </div>
                <div className="book-details">
                  <NavLink
                    to={`/shop/${book.title
                      .toLowerCase()
                      .replaceAll(" ", "-")}/${book.isbn[0]}`}
                    className="single-book-link"
                  >
                    <h3>{book.title}</h3>
                  </NavLink>

                  {getAuthor(book.author_name)}

                  <div className="item-price">
                    $ {Math.floor(Math.random() * (200 - 40) + 40)}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <hr />
        {pages.length > 1 ? (
          <div className="pageNumbers">
            <div className="btn__cover__prev">
              <button
                onClick={handlePrevBtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                Prev
              </button>
            </div>
            <div className="numbers">
              <ul>{renderPageNumbers}</ul>
            </div>
            <div className="btn__cover__next">
              <button
                onClick={handleNextBtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SearchResultPlusPagination;
