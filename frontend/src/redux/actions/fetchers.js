import axios from "axios";
import store from "../store/store";
import { toast } from "react-toastify";
import {
  setBadRequest,
  setInternetError,
  setPreloaderStatus,
  setCurrentBooks,
  setSingleBook,
  setFeaturedBooks,
  setBestOfferBooks,
  setUserInfo,
  setUserIsAuthenticated,
  removeUserInfo,
} from "./bookActions";

const backendUrl = "http://localhost:8000";
const demoUserUrl = "http://localhost:8000/api/login-demo-user/";
const userRegisterUrl = "http://localhost:8000/api/auth/register/";
const userLoginUrl = "http://localhost:8000/api/auth/login/";
const userLogoutUrl = "http://localhost:8000/api/auth/logout/";
const fetchDashboardInfoUrl = "http://localhost:8000/api/dashboard-info/";

const notify = (message, errorType) =>
  toast(message, {
    position: "top-right",
    autoClose: "3000",
    pauseOnHover: true,
    closeOnClick: true,
    type: errorType,
    theme: "colored",
  });

// Turn preloader on or off
export const switchPreloader = (status) => {
  store.dispatch(setPreloaderStatus(status));
};

export const fetchAllBooks = async () => {
  switchPreloader(true);
  let allFetchedBooks = [];
  let allCategories = [
    "textbook",
    "programming_languages",
    "history",
    "biography",
    "adventure",
    "fantasy",
  ];
  for (let i = 0; i < allCategories.length; i++) {
    const allBooksUrl =
      "https://openlibrary.org/subjects/" + allCategories[i] + ".json?limit=10";

    try {
      let response = await axios.get(allBooksUrl);
      allFetchedBooks.push(...response.data.works);
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
    store.dispatch(setCurrentBooks(allFetchedBooks));
  }
};

export const fetchSingleBook = async (slug) => {
  const singleBookUrl =
    "https://openlibrary.org/search.json?title=" + slug + "&limit=1";

  switchPreloader(true);
  await axios
    .get(singleBookUrl)
    .then((response) => {
      if (response.data["numFound"] === 0) {
        throw Error("bad url");
      } else {
        store.dispatch(setSingleBook(response.data["docs"][0]));
        switchPreloader(false);
      }
    })
    .catch((error) => {
      if (error.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        store.dispatch(setBadRequest(true));
      }
      switchPreloader(false);
    });
};

export const fetchRandomFeaturedBooks = async () => {
  switchPreloader(true);
  let allFetchedBooks = [];
  let allCategories = [
    "textbook",
    "programming_languages",
    "history",
    // "biography",
    "adventure",
    "fantasy",
  ];
  let shuffledCategories = allCategories
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 4);

  // console.log(shuffledCategories);
  // console.log(randomFourIndexes);

  for (let i = 0; i < shuffledCategories.length; i++) {
    const randomBooksUrl =
      "https://openlibrary.org/subjects/" +
      shuffledCategories[i] +
      ".json?limit=1";

    try {
      let response = await axios.get(randomBooksUrl);
      allFetchedBooks.push(...response.data.works);
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

  // console.log(allFetchedBooks);
  // console.log("");

  if (allFetchedBooks.length) {
    switchPreloader(false);
    store.dispatch(setFeaturedBooks(allFetchedBooks));
  }
  switchPreloader(false);
};

export const fetchbestOfferBooks = async () => {
  switchPreloader(true);
  let allFetchedBooks = [];
  let allCategories = [
    "textbook",
    "programming_languages",
    "history",
    "adventure",
    "fantasy",
  ];

  for (let i = 0; i < allCategories.length; i++) {
    const allBooksUrl =
      "https://openlibrary.org/subjects/" + allCategories[i] + ".json?limit=5";

    try {
      let response = await axios.get(allBooksUrl);
      allFetchedBooks.push(...response.data.works);
    } catch (error) {
      // console.log(error);
      // console.log("");
      if (error.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        store.dispatch(setBadRequest(true));
      }
      switchPreloader(false);
      break;
    }
  }

  let selectedBooks = allFetchedBooks
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 9);

  // console.log(selectedBooks);
  // console.log(selectedBooks.length);
  // console.log("");

  if (allFetchedBooks.length) {
    switchPreloader(false);
    store.dispatch(setBestOfferBooks(selectedBooks));
  }
  switchPreloader(false);
};

// Sign in user with token if correct credentials are provided
export const signInUser = async (signInData) => {
  switchPreloader(true);
  let body = JSON.stringify({
    email: signInData[0],
    password: signInData[1],
  });
  await axios
    .post(userLoginUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      notify("Successful login! Keep reading.", "success");
      localStorage.setItem("readMoreToken", result.data.token);
      delete result.data.token;
      store.dispatch(setUserInfo(result.data));
      store.dispatch(setUserIsAuthenticated(true));
      switchPreloader(false);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Incorrect email or password! Try again.", "error");
      switchPreloader(false);
      localStorage.removeItem("readMoreToken");
    });
};

// Login the demo user
export const loginDemoUser = async () => {
  switchPreloader(true);
  await axios
    .get(demoUserUrl)
    .then((result) => {
      store.dispatch(setUserInfo(result.data.user_info));
      notify("Successful login! Keep learning.", "success");
      localStorage.setItem("readMoreToken", result.data.token);
      store.dispatch(setUserIsAuthenticated(true));
      switchPreloader(false);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Something unexpected happened!", "error");
      switchPreloader(false);
    });
};

// Log out the user with token
export const logOutUser = async () => {
  let token = localStorage.getItem("readMoreToken");
  await axios
    .get(userLogoutUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((result) => {
      store.dispatch(setUserIsAuthenticated(false));
      localStorage.removeItem("readMoreToken");
      document.getElementById("home").click();
      store.dispatch(removeUserInfo());
      notify("Logout successful!", "info");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        notify("Unable to log out! Try again.", "error");
      }
    });
};

// Sign up users with the credentials that are provided
export const signUpUser = async (signUpData) => {
  switchPreloader(true);
  let body = JSON.stringify({
    first_name: signUpData[0],
    last_name: signUpData[1],
    email: signUpData[2],
    password: signUpData[3],
  });
  await axios
    .post(userRegisterUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      switchPreloader(false);
      document.getElementById("login").click();
      notify("Account created successfully! You can login now.", "success");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("You already have an account with us! Please login.", "info");
      switchPreloader(false);
      localStorage.removeItem("token");
    });
};
