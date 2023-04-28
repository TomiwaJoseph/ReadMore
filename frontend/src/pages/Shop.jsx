import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoInternet from "./NoInternet";
import MultiRangeSlider from "../components/MultiRangeSlider";
import Preloader from "../components/Preloader";
import Loader from "../components/Loader";
import { allCategoryList, allProducts, justBooks, justHistory } from "../data";
import allCatImg from "../static/all-cat.png";
import CategoryPlusPagination from "../components/CategoryPlusPagination";
import { fetchAllBooks } from "../redux/actions/fetchers";

const Shop = () => {
  const [data, setData] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
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
  } = storeContext;

  let shuffledCategoryData = currentCategoryData
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  let a = {
    kind: "books#volume",
    id: "eFdxDwAAQBAJ",
    etag: "WF7WDx/G5Bs",
    selfLink: "https://www.googleapis.com/books/v1/volumes/eFdxDwAAQBAJ",
    volumeInfo: {
      title: "Textbooks and War",
      subtitle: "Historical and Multinational Perspectives",
      authors: ["Eugenia Roldán Vera", "Eckhardt Fuchs"],
      publisher: "Springer",
      publishedDate: "2018-10-04",
      description:
        "This volume reflects on the role played by textbooks in the complex relationship between war and education from a historical and multinational perspective, asking how textbook content and production can play a part in these processes. It has long been established that history textbooks play a key role in shaping the next generation’s understanding of both past events and the concept of ‘friend’ and ‘foe’. Considering both current and historical textbooks, often through a bi-national comparative approach, the editors and contributors investigate various important aspects of the relationships between textbooks and war, including the role wars play in the creation of national identities (whether the country is on the winning or losing side), the effacement of international wars to highlight a country’s exceptionalism, or the obscuring of intra-national conflict through the ways in which a civil war is portrayed. This pioneering book will be of interest and value to students and scholars of textbooks, educational media and the relationships between curricula and war.",
      industryIdentifiers: [
        {
          type: "ISBN_13",
          identifier: "9783319988030",
        },
        {
          type: "ISBN_10",
          identifier: "3319988034",
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 344,
      printType: "BOOK",
      categories: ["Education"],
      maturityRating: "NOT_MATURE",
      allowAnonLogging: false,
      contentVersion: "preview-1.0.0",
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=eFdxDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=eFdxDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
      language: "en",
      previewLink:
        "http://books.google.com/books?id=eFdxDwAAQBAJ&printsec=frontcover&dq=Textbooks&hl=&cd=1&source=gbs_api",
      infoLink:
        "http://books.google.com/books?id=eFdxDwAAQBAJ&dq=Textbooks&hl=&source=gbs_api",
      canonicalVolumeLink:
        "https://books.google.com/books/about/Textbooks_and_War.html?hl=&id=eFdxDwAAQBAJ",
    },
    saleInfo: {
      country: "NG",
      saleability: "NOT_FOR_SALE",
      isEbook: false,
    },
    accessInfo: {
      country: "NG",
      viewability: "PARTIAL",
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: "ALLOWED",
      epub: {
        isAvailable: true,
        acsTokenLink:
          "http://books.google.com/books/download/Textbooks_and_War-sample-epub.acsm?id=eFdxDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
      },
      pdf: {
        isAvailable: true,
        acsTokenLink:
          "http://books.google.com/books/download/Textbooks_and_War-sample-pdf.acsm?id=eFdxDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
      },
      webReaderLink:
        "http://play.google.com/books/reader?id=eFdxDwAAQBAJ&hl=&source=gbs_api",
      accessViewStatus: "SAMPLE",
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        "This volume reflects on the role played by textbooks in the complex relationship between war and education from a historical and multinational perspective, asking how textbook content and production can play a part in these processes.",
    },
  };

  // console.log(shuffledCategoryData);
  // console.log(a.volumeInfo.title);

  useEffect(() => {
    setCategoryList(allCategoryList);
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (currentCategory === "All Books") {
      setData(allProducts);
    } else if (currentCategory === "Textbooks") {
      setData(justBooks);
    } else if (currentCategory === "History") {
      setData(justHistory);
    } else {
      setData([]);
    }
    document.body.style["overflow"] = "auto";
  }, [currentCategory]);

  useEffect(() => {
    if (data.length !== 0) {
      setDoneLoading(true);
    }
  }, [data.length]);

  const renderBooks = () => {
    if (data.length === 0 && doneLoading) {
      return (
        <div className="no-book">
          <p>No book match your filter parameters</p>
        </div>
      );
    } else {
      return (
        <CategoryPlusPagination
          // data={data}
          data={shuffledCategoryData}
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

  useEffect(() => {
    setPriceMaxValue(highestPrice);
  }, [highestPrice]);

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
    // console.log(category);
    // console.log(" ");
    setOpenCategories(false);
    setCurrentCategory(category);
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
        <div className="shop-cta-filter">
          <button onClick={() => handleCtaChange("category")} className="btn">
            Categories
          </button>
          <button onClick={() => handleCtaChange("filter")} className="btn">
            Filter + Sort
          </button>
        </div>
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
        {openFilter && (
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
        )}
        {renderBooks()}
      </>
    </div>
  );
};

export default Shop;
