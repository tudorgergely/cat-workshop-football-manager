import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import {MuiThemeProvider} from 'material-ui';
import {getMuiTheme, lightBaseTheme} from 'material-ui/styles';

import api from './api/FirebaseApi';

class App extends Component {
    componentDidMount() {
        api.auth.onAuthStateChanged(firebaseUser => {
            if(!!firebaseUser) {
                browserHistory.push('/home');
            } else {
                browserHistory.push('/login');
            }
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

export default App;
