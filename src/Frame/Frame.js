import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import api from '../api/FirebaseApi';

export class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};

        api.auth.onAuthStateChanged(firebaseUser => {
            if (!firebaseUser) {
                this.setState({
                    user: null
                });
            } else {
                this.setState({
                    user: firebaseUser.displayName
                });
            }
        });
    }

    logout() {
        api.auth.signOut();
        this.setState({open: false});
    }

    render() {
        const user = [<MenuItem key="username">{this.state.user}</MenuItem>, <Divider key="username.divider"/>];

        const logoutButton = [<Divider key="logout.divider"/>,
            <MenuItem key="logout" onTouchTap={() => this.logout()}>Logout</MenuItem>];

        return (
            <div style={{flex:1}}>
                <AppBar
                    title="Football manager"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={() => this.setState({open: !this.state.open})}
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    {this.state.user ? user : null}
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                    {this.state.user ? logoutButton : null}
                </Drawer>
                {this.props.children}
            </div>
        );
    }
}