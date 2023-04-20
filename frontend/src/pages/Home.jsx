import "./page-styles.css";
import SliderSection from "../components/SliderSection";
import Features from "../components/Features";
import Quotation from "../components/Quotation";
import Offers from "../components/Offers";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="home-container">
      <SliderSection />
      <Features />
      <Quotation />
      <Offers />
      <Newsletter />
    </div>
  );
};

export default Home;
