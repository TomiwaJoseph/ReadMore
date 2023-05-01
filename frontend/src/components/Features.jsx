import "./features.css";
import { NavLink, useNavigate } from "react-router-dom";
import { addToWishlist } from "../redux/actions/fetchers";
import noThumbnail from "../static/no-thumbnail.jpg";

const Features = ({ data, isAuthenticated }) => {
  const navigate = useNavigate();
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

  const handleWishlistClick = (nameAuthor) => {
    console.log(nameAuthor);
    console.log("");
    // if (isAuthenticated) {
    //   addToWishlist(nameAuthor);
    // } else {
    //   navigate("/login", {
    //     state: { nameAuthor: nameAuthor, action: "wishlist" },
    //   });
    // }
  };

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
                    //   onClick={() => addToCart(dress.id, 1)}
                    className="fas fa-shopping-bag"
                  ></i>
                  <i
                    onClick={() =>
                      handleWishlistClick([
                        book.title.toLowerCase().replaceAll(" ", "-"),
                        book.authors[0]["name"]
                          .toLowerCase()
                          .replaceAll(" ", "-"),
                      ])
                    }
                    className="fas fa-heart"
                  ></i>
                </div>
              </div>
              <div className="book-details">
                <NavLink
                  to={`/shop/${book.title.toLowerCase().replaceAll(" ", "-")}/${
                    book.availability["openlibrary_work"]
                  }`}
                  className="single-book-link"
                >
                  <h3>{book.title}</h3>
                </NavLink>

                {getAuthor(book.authors)}

                <div className="item-price">
                  $ {Math.floor(Math.random() * (200 - 40) + 40)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
