import "./offers.css";
import "./features.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { offerProducts } from "../data";
import { NavLink } from "react-router-dom";

const Offers = () => {
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
        <OwlCarousel {...carouselOptions}>
          {offerProducts.map((book, index) => (
            <div key={index}>
              <div className="product-image">
                <img src={book.image} className="img-fluid" alt={book.name} />
                <div className="hidden-cta">
                  <i className="fas fa-shopping-bag"></i>
                  <i className="fas fa-heart"></i>
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
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Offers;
