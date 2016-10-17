import React, {Component} from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {TimeRow} from './TimeRow';

import api from '../../api/FirebaseApi';
import moment from 'moment';

export class CalendarCell extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            availability: {}
        };
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
        if (!this.state.timeToSave || !moment(this.state.timeToSave).isValid()) {
            alert('Invalid date!');
        } else {
            api.participate(this.props.date, this.state.timeToSave)
                .then(() => {
                    this.setState({open: false, timeToSave: null})
                });
        }
    };

    componentWillReceiveProps(nextProps) {
        api.getAvailability(nextProps.date)
            .on('value', snap => {
                this.setState({availability: snap.val()});
            });
    }

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
                onTouchTap={this.handleSave}/>,
        ];

        const availabilityComponents = Object.keys(this.state.availability || {})
            .map(time => <TimeRow key={time} time={time}
                                  participants={Object.keys(this.state.availability[time]).map(uuid => this.state.availability[time][uuid])}/>);

        return (
            <div
                style={{}}
                className={`calendar-cell ${date.diff(today, 'days') === 0 ? 'today' : ''} ${!isThisMonth ? 'not-this-month' : ''}`}>
                <span>{date.format('D')}</span>

                {isThisMonth && !isWeekend ?
                    <FloatingActionButton
                        mini={true}
                        style={{position: 'absolute', bottom: '.5em', right: '.5em'}}
                        onMouseUp={this.handleOpen}>
                        <ContentAdd />
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

                {availabilityComponents}
            </div>
        )
    }
}