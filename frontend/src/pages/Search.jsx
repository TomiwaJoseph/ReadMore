import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Categories from "../components/Categories";
import Preloader from "../components/Preloader";
import SearchResultPlusPagination from "../components/SearchResultPlusPagination";
import {
  removeSearchResults,
  setDoneLoading,
} from "../redux/actions/bookActions";
import { searchBookByName } from "../redux/actions/fetchers";
import NoInternet from "./NoInternet";

const Search = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    doneLoading,
    noInternet,
    searchResults,
    isAuthenticated,
  } = storeContext;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let query = e.target.name.value.replaceAll(" ", "-");
    searchBookByName(query);
    document.getElementById("search-input").blur();
  };

  const renderSearchData = () => {
    if (searchResults.length === 0 && doneLoading) {
      return <p className="no-books">Book not found!</p>;
    } else {
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
    if (state) {
      searchBookByName(state.searchValue);
      document.getElementById("search-input").value =
        state.searchValue.replaceAll("-", " ");
    }
    return () => {
      dispatch(removeSearchResults(false));
      dispatch(setDoneLoading(false));
    };
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
