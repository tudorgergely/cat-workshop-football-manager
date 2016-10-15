import React, {Component} from 'react';
import {MuiThemeProvider} from 'material-ui';
import {Frame} from './Frame/Frame';
import {getMuiTheme, lightBaseTheme} from 'material-ui/styles';
import Select from 'rc-select';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-calendar/assets/index.css'
import 'rc-select/assets/index.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Frame>
                    <FullCalendar Select={Select}
                                  fullscreen/>
                </Frame>
            </MuiThemeProvider>
        );
    }
}

export default App;
