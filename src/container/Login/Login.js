import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

import api from '../../api/FirebaseApi';

export class Login extends Component {

    loginWithGoogle() {
        api.googleAuthPopup().then(null, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <FlatButton
                label="Login with Google"
                icon={<FontIcon className="fa fa-google"/>}
                onClick={this.loginWithGoogle}
            />
        );
    }
}
