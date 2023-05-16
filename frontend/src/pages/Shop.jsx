import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoInternet from "./NoInternet";
import Preloader from "../components/Preloader";
import { allCategoryList } from "../data";
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
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState("All Books");
  const [categoryList, setCategoryList] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const storeContext = useSelector((state) => state.store);
  const {
    currentCategoryData,
    isAuthenticated,
    fetchingData,
    noInternet,
    doneLoading,
  } = storeContext;

  useEffect(() => {
    setCategoryList(allCategoryList);
    fetchAllBooks();
    return () => {
      dispatch(setBadRequest(false));
      dispatch(setInternetError(false));
      dispatch(setDoneLoading(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const showCategories = () => {
    setOpenCategories(true);
    document.body.style["overflow"] = "hidden";
  };

  const hideCategories = () => {
    setOpenCategories(false);
    document.body.style["overflow"] = "auto";
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
    <>
      {!currentCategoryData.length ? (
        <Preloader />
      ) : (
        <div className="shop-container container">
          <>
            <h1>Shop</h1>
            <hr />
            <div className="shop-cta-filter">
              <button onClick={showCategories} className="btn">
                Categories
              </button>
            </div>
            <hr />
            <h3 className="category-title">{currentCategoryTitle}</h3>
            <hr />
            {openCategories && (
              <>
                <div className="categories-container">
                  <div>
                    <i
                      onClick={hideCategories}
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
            {renderBooks()}
          </>
        </div>
      )}
    </>
  );
};

export default Shop;
