import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import {MuiThemeProvider} from 'material-ui';
import {getMuiTheme, lightBaseTheme} from 'material-ui/styles';

import {Frame} from './container/Frame/Frame';

import api from './api/FirebaseApi';

class App extends Component {
    componentDidMount() {
        api.auth.onAuthStateChanged(firebaseUser => {
            if (!firebaseUser) {
                browserHistory.push('/login');
            }
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Frame>
                    {this.props.children }
                </Frame>
            </MuiThemeProvider>
        );
    }
}

export default App;
