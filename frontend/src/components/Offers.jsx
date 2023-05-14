import "./offers.css";
import "./features.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { NavLink, useNavigate } from "react-router-dom";
import noThumbnail from "../static/no-thumbnail.jpg";
import { addToCart, addToWishlist } from "../redux/actions/fetchers";
import Preloader from "./Preloader";

const Offers = ({ data, isAuthenticated }) => {
  const navigate = useNavigate();

  const selectedCartAuthor = (authors) => {
    let bookAuthor = "";
    if (authors.length === 1) {
      bookAuthor = authors[0]["name"];
    } else if (authors.length === 2) {
      bookAuthor = authors[0]["name"] + " & " + authors[1]["name"];
    } else {
      bookAuthor = authors[0]["name"] + " et. al.";
    }
    return bookAuthor;
  };

  const getAuthor = (authors) => {
    let bookAuthor = "";
    if (authors.length === 1) {
      bookAuthor = authors[0]["name"];
    } else if (authors.length === 2) {
      bookAuthor = authors[0]["name"] + " & " + authors[1]["name"];
    } else {
      bookAuthor = authors[0]["name"] + " et. al.";
    }
    return <p>{bookAuthor}</p>;
  };

  const getPriceAndDiscount = () => {
    let randomPrice = Math.floor(Math.random() * (200 - 40) + 40);
    let randomDiscount =
      randomPrice + Math.floor(Math.random() * (20 - 10) + 10);
    return (
      <div className="item-price">
        <span>${randomDiscount}</span>${randomPrice}
      </div>
    );
  };

  const handleWishlistClick = (nameISBN) => {
    if (isAuthenticated) {
      addToWishlist(nameISBN);
    } else {
      navigate("/login", {
        state: { nameISBN: nameISBN, action: "wishlist" },
      });
    }
  };

  const carouselOptions = {
    margin: 50,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      425: {
        items: 2,
      },
      475: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1440: {
        items: 4,
      },
    },
  };

  return (
    <div className="offers-container">
      <div className="section-header">
        <p>Grab Your Opportunity</p>
        <h2>Books With Offer</h2>
      </div>
      <div className="container">
        {data ? (
          <OwlCarousel {...carouselOptions}>
            {data.map((book, index) => (
              <div key={index}>
                <div className="product-image">
                  <img
                    src={
                      book.cover_id
                        ? "https://covers.openlibrary.org/b/id/" +
                          book.cover_id +
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
                          selectedCartAuthor(book.authors),
                          book.availability["isbn"],
                          book.cover_id ? true : false,
                        ])
                      }
                      className="fas fa-shopping-bag"
                    ></i>
                    <i
                      onClick={() =>
                        handleWishlistClick([
                          book.title.toLowerCase().replaceAll(" ", "-"),
                          book.availability["isbn"],
                          book.cover_id ? true : false,
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
                      .replaceAll(" ", "-")}/${book.availability["isbn"]}`}
                    className="single-book-link"
                  >
                    <h3>{book.title}</h3>
                  </NavLink>

                  {getAuthor(book.authors)}
                  {getPriceAndDiscount()}
                </div>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
};

export default Offers;
