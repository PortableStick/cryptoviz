import React from "react";
import { Switch, Route } from "react-router";
import Summary from "../Summary";
import CurrencyPage from "../CurrencyPage";

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Summary} />
        <Route path="/:name" component={CurrencyPage} />
      </Switch>
    </main>
  );
}

export default Main;
