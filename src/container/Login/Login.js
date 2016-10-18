import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

import api from '../../api/FirebaseApi';

export class Login extends Component {

    loginWithGoogle() {
        api.googleAuthPopup().catch(console.log.bind(console));
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <FlatButton
                    label="Login with Google"
                    icon={<FontIcon className="fa fa-google"/>}
                    onClick={this.loginWithGoogle}
                />
            </div>
        );
    }
}