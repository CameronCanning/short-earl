import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.scss';

//<React.StrictMode>
//</React.StrictMode>
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
 ,
  document.getElementById("root")
);