import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import App from "./App";

import "./index.css";
import "./sprites.css";
import registerServiceWorker from "./registerServiceWorker";
import initFaLibrary from "./initFaLibrary";

initFaLibrary();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
