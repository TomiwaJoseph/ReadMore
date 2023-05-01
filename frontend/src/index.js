import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
