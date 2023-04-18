import "./features.css";
import img1 from "../static/products/product-item1.jpg";

const Features = () => {
  return (
    <div className="features-container">
      <div className="section-header">
        <p>Some quality items</p>
        <h2>Featured Books</h2>
      </div>
      <div className="container">
        <div className="row">
          <div class="col-md-3">
            <figure class="product-style">
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
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
