import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import {browserHistory} from 'react-router';

import api from '../../api/FirebaseApi';

export class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            calendars: []
        };

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

    componentDidMount() {
        api.dbRef.on('value', snapshot => {
            const snap = snapshot.val();

            this.setState({
                calendars: Object.keys(snap).map(moduleId => {
                    return {
                        key: moduleId,
                        title: snap[moduleId]['_meta'].title,
                        photo: snap[moduleId]['_meta'].photo,
                    };
                })
            });
        });
    }

    logout() {
        api.auth.signOut();
        this.setState({open: false});
    }

    navigate(calendarKey) {
        this.setState({open: false});
        browserHistory.push(`/calendar/${calendarKey}`)

    }

    render() {
        const user = [<MenuItem key="username">{this.state.user}</MenuItem>, <Divider key="username.divider"/>];

        const logoutButton = [<Divider key="logout.divider"/>,
            <MenuItem key="logout" onTouchTap={() => this.logout()}>Logout</MenuItem>];

        return (
            <div style={{flex: 1}}>
                <AppBar
                    title={<span style={{cursor: 'pointer'}}>CAT planner</span>}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onTitleTouchTap={() => browserHistory.push('/')}
                    onLeftIconButtonTouchTap={() => this.setState({open: !this.state.open})}
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    {this.state.user ? user : null}

                    {this.state.calendars.map(calendar => (
                        <MenuItem
                            key={calendar.key}
                            onTouchTap={() => this.navigate(calendar.key)}
                            leftIcon={<img style={{borderRadius: '50%'}} src={calendar.photo} role="presentation"/>}>
                            {calendar.title}
                        </MenuItem>
                    ))}

                    {this.state.user ? logoutButton : null}
                </Drawer>
                {this.props.children}
            </div>
        );
    }
}