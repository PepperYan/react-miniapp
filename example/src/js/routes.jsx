import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Demo from './demo/App'

export default (
  <Route >
    <Switch>
      <Route exact path="/" component={Demo}/>
    
    </Switch>
  </Route>
);
