import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//require('dotenv').config({path: '../config.env'});

import './style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


//<React.StrictMode>
//</React.StrictMode>
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
 ,
  document.getElementById("root")
);