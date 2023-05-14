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
  setSearchResults,
  setDoneLoading,
  setWishlistData,
  setUserOrderHistory,
  setWishlistCount,
  setCartCount,
  setCartData,
  cleanCartData,
} from "./bookActions";

const backendUrl = "http://localhost:8000/api/";
const demoUserUrl = backendUrl + "login-demo-user/";
const userRegisterUrl = backendUrl + "auth/register/";
const userLoginUrl = backendUrl + "auth/login/";
const userLogoutUrl = backendUrl + "auth/logout/";
const fetchUserOrdersUrl = backendUrl + "get-user-orders/";
const addToWishlistUrl = backendUrl + "add-to-wishlist/";
const deleteWishlistDressUrl = backendUrl + "delete-wishlist-dress/";
const fetchWishlistDressesUrl = backendUrl + "fetch-wishlist-dresses/";
const addToCartUrl = backendUrl + "add-to-cart/";
const cartContentUrl = backendUrl + "get-cart-content/";
const cartCountUrl = backendUrl + "get-cart-count/";
const removeCartItemUrl = backendUrl + "remove-cart-item/";
const cleanCartUrl = backendUrl + "remove-cart/";

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
  let allBooksWithISBN = [];
  let categoryList = [[], [], [], [], [], []];
  let allCategories = [
    "textbook",
    "programming_languages",
    "mystery",
    "horror",
    "adventure",
    "thriller",
  ];

  for (let i = 0; i < allCategories.length; i++) {
    const allBooksUrl =
      "https://openlibrary.org/subjects/" + allCategories[i] + ".json?limit=30";

    try {
      let response = await axios.get(allBooksUrl);
      categoryList[i].push(...response.data.works);
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

  for (let i = 0; i < categoryList.length; i++) {
    let content = categoryList[i];
    for (let j = 0; j < content.length; j++) {
      if (content[j]["availability"]) {
        if (
          content[j]["title"] !== "Le petit prince" &&
          content[j]["availability"].isbn
        ) {
          allBooksWithISBN.push(content[j]);
        }
      }
    }
  }

  if (allBooksWithISBN.length) {
    switchPreloader(false);
    let shuffledBooks = allBooksWithISBN
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 60);

    console.log(shuffledBooks.length);
    store.dispatch(setCurrentBooks(shuffledBooks));
    store.dispatch(setDoneLoading(true));
  }
  switchPreloader(false);
};

export const fetchSingleBook = async (isbn) => {
  const singleBookUrl = "https://openlibrary.org/search.json?isbn=" + isbn;

  switchPreloader(true);
  await axios
    .get(singleBookUrl)
    .then((response) => {
      if (response.data["numFound"] === 0) {
        throw Error("bad url");
      } else {
        // console.log(response.data["docs"][0]);
        // console.log("");
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

export const getSingleCategory = async (category) => {
  switchPreloader(true);
  let allCategories = {
    Textbooks: "textbook",
    Programming: "programming_languages",
    Mystery: "mystery",
    Horror: "horror",
    Adventure: "adventure",
    Thriller: "thriller",
  };
  let allBooksWithISBN = [];
  let booksInCategory = [];
  const categoryUrl =
    "https://openlibrary.org/subjects/" +
    allCategories[category] +
    ".json?limit=40";

  try {
    let response = await axios.get(categoryUrl);
    booksInCategory.push(...response.data.works);
  } catch (error) {
    if (error.message === "Network Error") {
      store.dispatch(setInternetError(true));
    } else {
      store.dispatch(setBadRequest(true));
    }
    switchPreloader(false);
  }

  // console.log(booksInCategory[0]);
  // console.log("");

  for (let i = 0; i < booksInCategory.length; i++) {
    let content = booksInCategory[i];
    if (content["availability"]) {
      if (
        content["title"] !== "Le petit prince" &&
        content["availability"].isbn
      ) {
        allBooksWithISBN.push(content);
      }
    }
  }

  // console.log(allBooksWithISBN);
  // console.log(allBooksWithISBN.length);
  // console.log("");

  if (allBooksWithISBN.length) {
    switchPreloader(false);
    let shuffledBooks = allBooksWithISBN
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 20);
    store.dispatch(setCurrentBooks(shuffledBooks));
    store.dispatch(setDoneLoading(true));
  }
};

export const fetchRandomFeaturedBooks = async () => {
  switchPreloader(true);
  let randomFour = [];
  let homeResults = [];
  let haveISBN = [];
  let categoryList = [[], [], [], []];
  let allCategories = [
    "textbook",
    "programming_languages",
    "mystery",
    "horror",
    "adventure",
    "thriller",
  ];

  let shuffledCategories = allCategories
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 4);

  for (let i = 0; i < shuffledCategories.length; i++) {
    const randomBooksUrl =
      "https://openlibrary.org/subjects/" +
      shuffledCategories[i] +
      ".json?limit=20";

    try {
      let response = await axios.get(randomBooksUrl);
      categoryList[i].push(...response.data.works);
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

  if (categoryList[0].length !== 0) {
    for (let i = 0; i < categoryList.length; i++) {
      let content = categoryList[i];
      for (let j = 0; j < content.length; j++) {
        if (content[j]["availability"]) {
          if (
            content[j]["title"] !== "Le petit prince" &&
            content[j]["availability"].isbn
          ) {
            haveISBN.push(content[j]);
          }
        }
      }
      let selectedRandom = Math.floor(Math.random() * haveISBN.length);
      randomFour.push(haveISBN[selectedRandom]);
      homeResults.push(...haveISBN);
      haveISBN = [];
    }
  }

  if (randomFour.length) {
    // console.log("");
    // console.log("random four is not empty");
    // console.log(randomFour);
    // console.log("");
    switchPreloader(false);
    store.dispatch(setFeaturedBooks(randomFour));
    let shuffledBooks = homeResults
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 9);
    store.dispatch(setBestOfferBooks(shuffledBooks));
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
      if (signInData[2]) {
        addToWishlist(signInData[2]);
      }
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

// Know if user is authenticated
export const authenticateUser = async (authenticateUrl, callback) => {
  let token = localStorage.getItem("readMoreToken");
  await axios
    .get(authenticateUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
    });
};

// Login the demo user
export const loginDemoUser = async (action) => {
  switchPreloader(true);
  await axios
    .get(demoUserUrl)
    .then((result) => {
      store.dispatch(setUserInfo(result.data.user_info));
      notify("Successful login! Keep learning.", "success");
      localStorage.setItem("readMoreToken", result.data.token);
      store.dispatch(setUserIsAuthenticated(true));
      if (action !== undefined) {
        addToWishlist(action);
      }
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
      localStorage.removeItem("readMoreToken");
    });
};

// Add book to wishlist in server
export const addToWishlist = async (nameISBN) => {
  // console.log(nameISBN);
  let token = localStorage.getItem("readMoreToken");
  let body = JSON.stringify({
    token: token,
    nameISBN: nameISBN,
  });
  await axios
    .post(addToWishlistUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      notify("Book added to wishlist successfully!", "info");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Something unexpected happened!", "error");
    });
};

// Search book by name in api
export const searchBookByName = async (name) => {
  let searchResults = [];
  let filteredResult = [];
  let apiSearchUrl =
    "https://openlibrary.org/search.json?q=" + name + "&limit=20";

  switchPreloader(true);
  try {
    let response = await axios.get(apiSearchUrl);
    searchResults.push(...response.data["docs"]);
  } catch (error) {
    if (error.message === "Network Error") {
      store.dispatch(setInternetError(true));
    } else {
      store.dispatch(setBadRequest(true));
    }
    switchPreloader(false);
  }

  if (searchResults.length) {
    for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].isbn) {
        filteredResult.push(searchResults[i]);
      }
    }
  }

  if (filteredResult.length) {
    // console.log(filteredResult);
    // console.log("");
    store.dispatch(setSearchResults(filteredResult));
    store.dispatch(setDoneLoading(true));
  } else {
    store.dispatch(setSearchResults([]));
    store.dispatch(setDoneLoading(true));
  }
  switchPreloader(false);
};

// Fetch all user's wishlist dresses from server
export const fetchWishlistDresses = async () => {
  let token = localStorage.getItem("readMoreToken");
  let body = JSON.stringify({
    token: token,
  });
  switchPreloader(true);
  await axios
    .post(fetchWishlistDressesUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      switchPreloader(false);
      // console.log(result.data);
      // console.log("");
      store.dispatch(setWishlistData(result.data));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      switchPreloader(false);
    });
};

// Delete wishlist item from server
export const deleteWishlistDress = async (isbn) => {
  let token = localStorage.getItem("readMoreToken");
  let body = JSON.stringify({
    token: token,
    isbn: isbn,
  });
  await axios
    .post(deleteWishlistDressUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      // console.log(result);
      store.dispatch(setWishlistCount(result.data.wishlist_count));
    })
    .catch((err) => {
      // console.log(err);
      // console.log("");
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Something unexpected happened!", "error");
    });
};

// Fetch all user's orders from server
export const fetchUserOrders = async () => {
  let token = localStorage.getItem("readMoreToken");
  let body = JSON.stringify({
    token: token,
  });
  switchPreloader(true);
  await axios
    .post(fetchUserOrdersUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      switchPreloader(false);
      store.dispatch(setUserOrderHistory(result.data.user_orders));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      switchPreloader(false);
    });
};

// Fetch details of selected order from server
// export const fetchOrderDetails = async (refCode) => {
//   let token = localStorage.getItem("dressupToken");
//   let body = JSON.stringify({
//     token: token,
//     ref_code: refCode,
//   });
//   switchPreloader(true);
//   await axios
//     .post(fetchOrderDetailsUrl, body, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((result) => {
//       switchPreloader(false);
//       // store.dispatch(setUserOrderDressesData(result.data.order_item_data));
//       // store.dispatch(setUserOrderDetails(result.data.order_details));
//     })
//     .catch((err) => {
//       if (err.message === "Network Error") {
//         store.dispatch(setInternetError(true));
//       }
//       notify("Something unexpected happened!", "error");
//       switchPreloader(false);
//     });
// };

// Add book to cart in session storage in server
export const addToCart = async (details) => {
  // console.log(details);
  let body = JSON.stringify({
    bookTitle: details[0],
    bookAuthor: details[1],
    bookISBN: details[2],
    hasCover: details[3],
  });
  // console.log(body);
  // console.log("");
  await axios
    .post(addToCartUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      store.dispatch(setCartCount(result.data.cart_count));
      notify("Book added to cart successfully!", "info");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Something unexpected happened!", "error");
    });
};

// Get all cart content from server
export const fetchCartContent = async () => {
  switchPreloader(true);
  await axios
    .get(cartContentUrl)
    .then((response) => {
      // console.log(response.data);
      // console.log("");
      store.dispatch(setCartData(response.data));
      store.dispatch(setDoneLoading(true));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};

// Get the cart count from server
export const fetchCartCount = async () => {
  switchPreloader(true);
  await axios
    .get(cartCountUrl)
    .then((response) => {
      store.dispatch(setCartCount(response.data));
      // store.dispatch(setDoneLoading(true));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};

// Remove book from cart in sessionStorage in server
export const removeCartItem = async (isbn) => {
  let body = JSON.stringify({
    bookISBN: isbn,
  });
  await axios
    .post(removeCartItemUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      store.dispatch(setCartCount(result.data.cart_count));
      notify("Book removed from cart!", "info");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Something unexpected happened!", "error");
    });
};

// Remove cart from session in server
export const removeCart = async () => {
  switchPreloader(true);
  await axios
    .get(cleanCartUrl)
    .then((response) => {
      store.dispatch(cleanCartData());
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
