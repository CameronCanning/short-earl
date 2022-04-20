import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import './style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
 ,
  document.getElementById("root")
);