import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import api from '../../api/FirebaseApi';

export class Login extends React.Component {
    onLoginClick() {
        api.googleAuthPopup().then(() => {
            console.log('login success');
        }, console.error);
    }

    render() {
        return (
            <div>
                <FlatButton
                    label="Login with Google"
                    onClick={this.onLoginClick}
                    icon={<FontIcon className="fa fa-google"/>}>
                </FlatButton>
            </div>
        );
    }
}
