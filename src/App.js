import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import {MuiThemeProvider} from 'material-ui';
import {getMuiTheme, lightBaseTheme} from 'material-ui/styles';

import {Frame} from './Frame/Frame';

import 'rc-calendar/assets/index.css'
import 'rc-select/assets/index.css';

import firebaseApi from './api/FirebaseApi';

class App extends Component {
    componentDidMount() {
        firebaseApi.auth.onAuthStateChanged(firebaseUser => {
            console.debug('current user', firebaseUser);
            if (!!firebaseUser) {
                browserHistory.push('/calendar');
            } else {
                browserHistory.push('/login');
            }
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Frame>
                    {this.props.children}
                </Frame>
            </MuiThemeProvider>
        );
    }
}

export default App;
