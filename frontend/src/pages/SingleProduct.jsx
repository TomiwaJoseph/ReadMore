import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoInternet from "./NoInternet";
import ErrorPage from "./ErrorPage";
import Preloader from "../components/Preloader";
import img8 from "../static/products/product-item8.jpg";

const SingleProduct = () => {
  const { bookSlug } = useParams();
  //   const [singleBookData, setSingleBookData] = useState(null)
  const bookDetails = {
    name: "Once Upon A Time",
    slug: "once-upon-a-time",
    category: "Adventure",
    image: img8,
    author: "Klien Marry",
    price: "35.00",
  };
  const storeContext = useSelector((state) => state.store);
  const {
    backendUrl,
    fetchingData,
    badRequest,
    noInternet,
    singleBookDetails,
  } = storeContext;

  //   useEffect(() => {
  //     setSingleBookData();
  //   }, []);

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
    <div className="single-product-container container">
      <div className="single-product-row">
        <div className="single-product-img">
          <img src={bookDetails.image} alt={bookDetails.name} />
        </div>
        <div className="product-detail-container">
          <h2>{bookDetails.name}</h2>
          <p className="author">
            {bookDetails.author} - <span>{bookDetails.category}</span>
          </p>
          <p className="item-price">$ {bookDetails.price}</p>
          <p className="item-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga non,
            modi eaque ratione mollitia quae doloribus facere, reiciendis fugiat
            autem a quasi repudiandae vero porro repellat? Quos consectetur
            adipisci, eaque repudiandae nulla nam voluptas. Eum, aut magnam.
            Dicta sapiente, laudantium veniam maxime adipisci recusandae
            expedita temporibus iure tenetur nam eum.
          </p>
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
