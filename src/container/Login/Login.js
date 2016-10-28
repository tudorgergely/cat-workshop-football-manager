import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import {browserHistory} from 'react-router';

import api from '../../api/FirebaseApi';

import './login.css';

export class Login extends Component {

    componentDidMount() {
        api.auth.onAuthStateChanged(firebaseUser => {
            if (!!firebaseUser) {
                browserHistory.push('/');
            }
        })
    }

    static onLoginClick() {
        api.googleAuthPopup().then(null, console.error);
    }

    render() {
        return (
            <div className="login-container">
                <FlatButton
                    label="Login with Google"
                    onClick={Login.onLoginClick}
                    icon={<FontIcon className="fa fa-google"/>}>
                </FlatButton>
            </div>
        );
    }
}
