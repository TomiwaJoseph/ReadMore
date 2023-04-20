import "./features.css";
import { featuredProducts } from "../data";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Features = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(featuredProducts);
  }, []);

  return (
    <div className="features-container">
      <div className="section-header">
        <p>Some quality items</p>
        <h2>Featured Books</h2>
      </div>
      <div className="container">
        <div className="row">
          {data.map((book, index) => (
            <div key={index} className="col-md-3">
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
          {/* <div class="col-md-3"> */}
          {/* <figure class="product-style">
              <img src={img1} alt="Books" class="product-item" />
              <button
                type="button"
                class="add-to-cart"
                data-product-tile="add-to-cart"
              >
                Add to Cart
              </button>
              <figcaption>
                <h3>Simple way of piece life</h3>
                <p>Armor Ramsey</p>
                <div class="item-price">$ 40.00</div>
              </figcaption>
            </figure> */}
          {/* <div className="wrapper">
              <p>Text</p>
              <div id="slide">
                <a href="/">
                  <button>Add To Cart</button>
                </a>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Features;
