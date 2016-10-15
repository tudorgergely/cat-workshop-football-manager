import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

import Routes from "./Routes";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    Routes,
    document.getElementById('root')
);
