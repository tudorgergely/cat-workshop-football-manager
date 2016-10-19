import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    Routes,
    document.getElementById('root')
);
