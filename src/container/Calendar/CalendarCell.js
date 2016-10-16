import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import api from '../../api/FirebaseApi';

export class CalendarCell extends Component {

    constructor() {
        super();
        this.state = {open: false};
    }

    handleChangeTimePicker = (event, time) => {
        this.setState({timeToSave: time})
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () => {
        api.participate(this.props.date, this.state.timeToSave)
            .then(() => {
                this.setState({open: false, timeToSave: null})
            });
    };

    render() {
        const {date, today} = this.props;

        const isThisMonth = date.month() === today.month();
        const isWeekend = date.day() === 0 || date.day() === 6;

        const dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}/>,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave}/>,
        ];

        return (
            <div
                className={`calendar-cell ${date.diff(today, 'days') === 0 ? 'today' : ''} ${!isThisMonth ? 'not-this-month' : ''}`}>
                <span>{date.format('D')}</span>

                {isThisMonth && !isWeekend ?
                    <FloatingActionButton
                        mini={true}
                        style={{position: 'absolute', bottom: '.5em', right: '.5em'}}
                        onMouseUp={this.handleOpen}>
                        <NavigationCheck />
                    </FloatingActionButton> : null}

                <Dialog
                    title="Select the start time"
                    actions={dialogActions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

                    <TimePicker
                        format="24hr"
                        hintText="Select the time"
                        onChange={this.handleChangeTimePicker}/>
                </Dialog>
            </div>
        )
    }
}