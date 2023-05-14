import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoInternet from "./NoInternet";
import MultiRangeSlider from "../components/MultiRangeSlider";
import Preloader from "../components/Preloader";
import { allCategoryList, justBooks, justHistory } from "../data";
import allCatImg from "../static/all-cat.png";
import CategoryPlusPagination from "../components/CategoryPlusPagination";
import { fetchAllBooks, getSingleCategory } from "../redux/actions/fetchers";
import {
  setBadRequest,
  setDoneLoading,
  setInternetError,
} from "../redux/actions/bookActions";

const Shop = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  // const [doneLoading, setDoneLoading] = useState(false);
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState("All Books");
  const [currentCategory, setCurrentCategory] = useState("All Books");
  const [categoryList, setCategoryList] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [priceMinValue, setPriceMinValue] = useState(1);
  const [priceMaxValue, setPriceMaxValue] = useState(0);
  const storeContext = useSelector((state) => state.store);
  const {
    currentCategoryData,
    highestPrice,
    isAuthenticated,
    fetchingData,
    noInternet,
    doneLoading,
  } = storeContext;

  // let shuffledCategoryData = currentCategoryData
  //   .map((value) => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value);

  useEffect(() => {
    setCategoryList(allCategoryList);
    fetchAllBooks();
    return () => {
      dispatch(setBadRequest(false));
      dispatch(setInternetError(false));
      dispatch(setDoneLoading(false));
    };
  }, []);

  // useEffect(() => {
  //   document.body.style["overflow"] = "auto";
  //   console.log("category just changed...");
  //   console.log("");
  // }, [currentCategory]);

  const renderBooks = () => {
    if (currentCategoryData.length === 0 && doneLoading) {
      return (
        <div className="no-book">
          <p>No book match your filter parameters</p>
        </div>
      );
    } else {
      return (
        <CategoryPlusPagination
          data={currentCategoryData}
          isAuthenticated={isAuthenticated}
        />
      );
    }
  };

  const handleFilterBookSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted...");
    const data = new FormData(e.target);
    const selectedCategories = Object.keys(Object.fromEntries(data.entries()));
    console.log("This is the price range: ");
    console.log(priceMinValue, " to ", priceMaxValue);
    console.log("Here are the selected: ");
    console.log(selectedCategories);
    console.log(" ");
  };

  // useEffect(() => {
  //   setPriceMaxValue(highestPrice);
  // }, [highestPrice]);

  const handlePriceChange = (min, max) => {
    setPriceMinValue(min);
    setPriceMaxValue(max);
  };

  const handleCtaChange = (section) => {
    if (section === "category") {
      setOpenCategories(true);
      document.body.style["overflow"] = "hidden";
    } else {
      setOpenFilter(true);
      document.body.style["overflow"] = "hidden";
    }
  };

  const closeCta = (section) => {
    if (section === "category") {
      setOpenCategories(false);
    } else {
      setOpenFilter(false);
    }
    document.body.style["overflow"] = "auto";
  };

  const setCorrectStyle = (type) => {
    let allCheckboxes = document.querySelectorAll("input[type='checkbox']");

    if (type === "all") {
      // Uncheck all other categories and check all books category
      for (var i = 0; i < allCheckboxes.length; i++) {
        let theName = allCheckboxes[i].getAttribute("name");
        if (theName !== "All Books") {
          allCheckboxes[i].checked = false;
        }
      }
    } else {
      // Uncheck all book category
      for (var i = 0; i < allCheckboxes.length; i++) {
        let theName = allCheckboxes[i].getAttribute("name");
        if (theName === "All Books") {
          allCheckboxes[i].checked = false;
        }
      }
    }
  };

  const handleCategoryClick = (category) => {
    setOpenCategories(false);
    dispatch(setDoneLoading(false));
    if (category === "All Books") {
      fetchAllBooks();
    } else {
      getSingleCategory(category);
    }
    setCurrentCategoryTitle(category);
    document.body.style["overflow"] = "auto";
  };

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="shop-container container">
      <>
        <h1>Shop</h1>
        <hr />
        <div className="shop-cta-filter">
          <button onClick={() => handleCtaChange("category")} className="btn">
            Categories
          </button>
          {/* <button onClick={() => handleCtaChange("filter")} className="btn">
            Filter + Sort
          </button> */}
        </div>
        <hr />
        <h3 class="category-title">{currentCategoryTitle}</h3>
        <hr />
        {openCategories && (
          <>
            <div className="categories-container">
              <div>
                <i
                  onClick={() => closeCta("category")}
                  className="fa fa-arrow-left"
                ></i>
                <div className="container">
                  <div className="all-categories">
                    <div
                      onClick={() => handleCategoryClick("All Books")}
                      className="each-category"
                    >
                      <div className="category-img-box">
                        <img src={allCatImg} alt="all-category" />
                      </div>
                      <button className="btn">All Books</button>
                    </div>
                    {categoryList.map((cat, index) => (
                      <div
                        key={index}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="each-category"
                      >
                        <div className="category-img-box">
                          <img src={cat.image} alt={cat.name} />
                        </div>
                        <button className="btn">{cat.name}</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* {openFilter && (
          <>
            <div className="filter-container">
              <i
                onClick={() => closeCta("filter")}
                className="fa fa-arrow-left"
              ></i>
              <form onSubmit={handleFilterBookSubmit}>
                <div className="filter-parameter">
                  <span className="search-item-slider">
                    <i className="fas fa-coins"></i>
                    books of ${priceMinValue} to ${priceMaxValue}
                  </span>
                  <div className="slider-div">
                    <MultiRangeSlider
                      min={1}
                      max={highestPrice}
                      onChange={({ min, max }) => handlePriceChange(min, max)}
                    />
                  </div>
                  <div className="container">
                    <div className="filter-category-container">
                      <div id="filter_checkboxes" className="my-2 mr-2">
                        <input
                          type="checkbox"
                          name="All Books"
                          id="All Books"
                          value="All Books"
                          onChange={() => setCorrectStyle("all")}
                          defaultChecked={true}
                        />
                        <label htmlFor="All Books">All Books</label>
                      </div>
                      {categoryList.map((cat) => (
                        <div
                          onChange={() => setCorrectStyle("others")}
                          key={cat.name}
                          id="filter_checkboxes"
                          className="my-2 mr-2"
                        >
                          <input
                            type="checkbox"
                            name={cat.name}
                            id={cat.name}
                            value={cat.name}
                          />
                          <label htmlFor={cat.name}>{cat.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button id="submit" type="submit" className="btn">
                    Filter Now
                  </button>
                </div>
              </form>
            </div>
          </>
        )} */}
        {renderBooks()}
      </>
    </div>
  );
};

export default Shop;
