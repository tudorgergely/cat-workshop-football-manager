import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import api from '../../api/FirebaseApi';
import {Calendar} from '../Calendar/Calendar';

export class Home extends React.Component {
    logout() {
        api.auth.signOut();
    }

    render() {
        return (
            <div>
                You are home!

                <FlatButton
                    label="Logout"
                    onClick={this.logout}>
                </FlatButton>

                <Calendar />
            </div>
        );
    }
}