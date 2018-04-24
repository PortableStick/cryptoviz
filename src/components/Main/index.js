import React from 'react';
import { Switch, Route } from 'react-router';
import Summary from '../Summary';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Summary} />
      </Switch>
    </main>
  );
}

export default Main;
