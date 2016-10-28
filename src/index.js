import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'font-awesome/css/font-awesome.min.css';

injectTapEventPlugin();

ReactDOM.render(
    Routes,
    document.getElementById('root')
);
