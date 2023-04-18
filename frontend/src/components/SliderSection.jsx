import img1 from "../static/slider-1.png";
import img2 from "../static/slider-2.png";
import img3 from "../static/slider-3.png";
// import img4 from "../static/slider-4.png";
import "./slidersection.css";

const SliderSection = () => {
  return (
    <section className="slider_section">
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <div className="img-box">
                    <img className="img-fluid" src={img1} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="detail-box">
                    <h5>ReadMore Bookstore</h5>
                    <h1>
                      <q>Books are a uniquely portable magic.</q>
                    </h1>
                    <p>Stephen king</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container ">
              <div className="row">
                <div className="col-md-5">
                  <div className="img-box">
                    <img className="img-fluid" src={img2} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="detail-box">
                    <h5>ReadMore Bookstore</h5>
                    <h1>
                      <q>There is no friend as loyal as a book.</q>
                    </h1>
                    <p>Ernest Hemingway</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container ">
              <div className="row">
                <div className="col-md-5">
                  <div className="img-box">
                    <img className="img-fluid" src={img3} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="detail-box">
                    <h5>ReadMore Bookstore</h5>
                    <h1>
                      <q>Today a reader, tomorrow a leader.</q>
                    </h1>
                    <p>Margaret Fuller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel_btn_box">
          <a
            className="carousel-control-prev"
            href="#customCarousel1"
            role="button"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </a>
          <a
            className="carousel-control-next"
            href="#customCarousel1"
            role="button"
            data-slide="next"
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
