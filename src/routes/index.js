import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
