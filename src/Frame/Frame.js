import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';

export class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Football manager"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={() => this.setState({open: !this.state.open})}
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
                {this.props.children}
            </div>
        );
    }
}