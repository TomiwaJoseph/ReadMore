import img1 from "../static/slider-1.png";
import img2 from "../static/slider-2.png";
import img3 from "../static/slider-3.png";
import "./slidersection.css";

const SliderSection = () => {
  return (
    <section className="slider-section">
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item">
            <div className="single-slide">
              <div className="img-box">
                <img className="img-fluid" src={img1} alt="" />
              </div>
              <div className="detail-box">
                <h5>ReadMore Bookstore</h5>
                <h1>
                  <q>Books are a uniquely portable magic.</q>
                </h1>
                <p>Stephen king</p>
                <div className="controllers">
                  <a href="#customCarousel1" data-slide="prev" role="button">
                    <i className="fa fa-angle-left"></i>
                  </a>
                  <a href="#customCarousel1" data-slide="next" role="button">
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <div className="single-slide">
              <div className="img-box">
                <img className="img-fluid" src={img2} alt="" />
              </div>
              <div className="detail-box">
                <h5>ReadMore Bookstore</h5>
                <h1>
                  <q>There is no friend as loyal as a book.</q>
                </h1>
                <p>Ernest Hemingway</p>
                <div className="controllers">
                  <a href="#customCarousel1" data-slide="prev" role="button">
                    <i className="fa fa-angle-left"></i>
                  </a>
                  <a href="#customCarousel1" data-slide="next" role="button">
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="single-slide">
              <div className="img-box">
                <img className="img-fluid" src={img3} alt="" />
              </div>
              <div className="detail-box">
                <h5>ReadMore Bookstore</h5>
                <h1>
                  <q>Today a reader, tomorrow a leader.</q>
                </h1>
                <p>Margaret Fuller</p>
                <div className="controllers">
                  <a href="#customCarousel1" data-slide="prev" role="button">
                    <i className="fa fa-angle-left"></i>
                  </a>
                  <a href="#customCarousel1" data-slide="next" role="button">
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
