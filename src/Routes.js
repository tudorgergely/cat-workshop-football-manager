import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import {Login} from './container/Login/Login';
import {Home} from './container/Home/Home';

export default (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='/login' component={Login}/>
            <Route path='/home' component={Home}/>
        </Route>
    </Router>
);