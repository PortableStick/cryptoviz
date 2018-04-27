import React from "react";
import { Switch, Route } from "react-router";
import CurrencyList from "../CurrencyList";
import CurrencyPage from "../CurrencyPage";

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={CurrencyList} />
        <Route path="/:name" component={CurrencyPage} />
      </Switch>
    </main>
  );
}

export default Main;
