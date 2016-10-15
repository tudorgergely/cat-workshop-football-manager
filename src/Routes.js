import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import App from './App';
import {Login, Calendar} from './container/index'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="login" component={Login}/>
            <Route path="calendar" component={Calendar}/>
        </Route>
    </Router>
);
