import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
// import CategoryPlusPagination from "../components/CategoryPlusPagination";
import Preloader from "../components/Preloader";
import SearchResultPlusPagination from "../components/SearchResultPlusPagination";
import { searchBookByName } from "../redux/actions/fetchers";
// import ErrorPage from "./ErrorPage";
import NoInternet from "./NoInternet";

const Search = () => {
  const [doneLoading, setDoneLoading] = useState(false);
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, noInternet, searchResults, isAuthenticated } =
    storeContext;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let query = e.target.name.value.replaceAll(" ", "-");
    searchBookByName(query);
    setDoneLoading(true);
    document.getElementById("search-input").blur();
  };

  const renderSearchData = () => {
    if (!searchResults.length && doneLoading) {
      return <p className="no-books">Book not found!</p>;
    } else if (searchResults.length && doneLoading) {
      return (
        <>
          <SearchResultPlusPagination
            data={searchResults}
            isAuthenticated={isAuthenticated}
          />
        </>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <div className="search-container container">
      <h1>Search</h1>
      <form onSubmit={handleSubmitForm} className="search-form">
        <input
          type="text"
          autoFocus
          name="name"
          className="form-control"
          placeholder="enter your search value here"
          required
          id="search-input"
        />
      </form>
      {renderSearchData()}
      <Categories />
    </div>
  );
};

export default Search;
