import axios from "axios";
import store from "../store/store";
import {
  setBadRequest,
  setInternetError,
  setPreloaderStatus,
  setCurrentBooks,
} from "./bookActions";

const backendUrl = "http://localhost:8000";
const apiKey = "AIzaSyDIs0Ca_FDxjvzF8y6VfUyC6SQILuEIqec";

// Turn preloader on or off
export const switchPreloader = (status) => {
  store.dispatch(setPreloaderStatus(status));
};

export const fetchAllBooks = async () => {
  switchPreloader(true);
  let allFetchedBooks = [];
  let allCategories = [
    "Textbooks",
    "Science",
    "History",
    "Biography",
    "Adventure",
    "Fantasy",
  ];
  for (let i = 0; i < allCategories.length; i++) {
    const allBooksUrl =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      allCategories[i] +
      "&key=" +
      apiKey +
      "&maxResults=10";

    try {
      let response = await axios.get(allBooksUrl);
      allFetchedBooks.push(...response.data.items);
    } catch (error) {
      if (error.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        store.dispatch(setBadRequest(true));
      }
      switchPreloader(false);
      break;
    }
  }

  if (allFetchedBooks.length) {
    switchPreloader(false);
    // console.log("done fetching");
    store.dispatch(setCurrentBooks(allFetchedBooks));
    // console.log("already set...");
  }
};
