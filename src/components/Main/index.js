import React from 'react';
import { Switch, Route } from 'react-router';
import Summary from '../Summary';
import Specialized from '../Specialized';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Summary} />
        <Route path="/:name" component={Specialized} />
      </Switch>
    </main>
  );
}

export default Main;
