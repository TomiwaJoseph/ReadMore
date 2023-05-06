import SliderSection from "../components/SliderSection";
import Features from "../components/Features";
import Quotation from "../components/Quotation";
import Offers from "../components/Offers";
import Newsletter from "../components/Newsletter";
import { fetchRandomFeaturedBooks } from "../redux/actions/fetchers";
import Preloader from "../components/Preloader";
import NoInternet from "./NoInternet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setBadRequest, setInternetError } from "../redux/actions/bookActions";

const Home = () => {
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    isAuthenticated,
    noInternet,
    featuredBooksData,
    bestOfferBooks,
  } = storeContext;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRandomFeaturedBooks();
    return () => {
      dispatch(setBadRequest(false));
      dispatch(setInternetError(false));
    };
  }, []);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="home-container">
      <SliderSection />
      <Features data={featuredBooksData} isAuthenticated={isAuthenticated} />
      <Quotation />
      <Offers data={bestOfferBooks} isAuthenticated={isAuthenticated} />
      <Newsletter />
    </div>
  );
};

export default Home;
