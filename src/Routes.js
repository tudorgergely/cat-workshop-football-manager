import React from 'react';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './App';

import {Login} from './container/Login/Login';
import {Home} from './container/Home/Home';
import {CalendarPlanner} from './container/CalendarPlanner/CalendarPlanner';

export default (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='/login' component={Login}/>
            <Route path='/calendar/:activity' component={CalendarPlanner}/>

            <IndexRoute component={Home}/>
        </Route>
    </Router>
);