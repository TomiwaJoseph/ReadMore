import "./page-styles.css";
import SliderSection from "../components/SliderSection";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="home-container">
      <SliderSection />
      <Features />
    </div>
  );
};

export default Home;
