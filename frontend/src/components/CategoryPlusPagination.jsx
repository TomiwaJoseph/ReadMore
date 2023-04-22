import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addToCart, addToWishlist } from "../redux/actions/fetchers";
import "./categorypluspagination.css";

const CategoryPlusPagination = ({ data, isAuthenticated }) => {
  const navigate = useNavigate();
  const dataToRender = data;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleWishlistClick = (id) => {
    if (isAuthenticated) {
      addToWishlist(id);
    } else {
      navigate("/login", { state: { id: id, action: "wishlist" } });
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

  return (
    <>
      <div className="container">
        <div className="row category-container">
          {currentItems &&
            currentItems.map((book, index) => (
              <div key={index} className="col-md-4 col-lg-4 col-xl-3">
                <div className="product-image">
                  <img src={book.image} className="img-fluid" alt={book.name} />
                  <div className="hidden-cta">
                    <i
                      //   onClick={() => addToCart(dress.id, 1)}
                      className="fas fa-shopping-bag"
                    ></i>
                    <i
                      //   onClick={() => handleWishlistClick(dress.id)}
                      className="fas fa-heart"
                    ></i>
                  </div>
                </div>
                <div className="book-details">
                  <NavLink
                    to={`/shop/book/${book.slug}`}
                    className="single-book-link"
                  >
                    <h3>{book.name}</h3>
                  </NavLink>
                  <p>{book.author}</p>
                  <div className="item-price">$ {book.price}</div>
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

export default CategoryPlusPagination;
