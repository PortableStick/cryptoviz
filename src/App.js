import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";

const App = () => (
  <div className="App">
    <Header />
    <Main />
  </div>
);

export default App;
