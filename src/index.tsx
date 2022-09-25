import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import axios from "axios";

// axios default settings
axios.defaults.baseURL =
  "http://emphasoft-test-assignment.herokuapp.com/api/v1/users/";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common[
  "Authorization"
] = `Token ${process.env.REACT_APP_API_TOKEN}`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
