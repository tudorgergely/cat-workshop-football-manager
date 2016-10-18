import React, {Component} from 'react';

import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';

import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import {CalendarCell} from './CalendarCell';
import api from '../../api/FirebaseApi';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';


export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            timeToSave: null,
            dateToSave: null,
            availabilities: {}
        };

        this.renderCalendarCell = this.renderCalendarCell.bind(this);
        this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}/>,
            <FlatButton
                label="Save"
                primary={true}
                onTouchTap={this.handleSave}/>,
        ];
    }

    renderCalendarCell(date, today) {
        const participants = this.state.availabilities[date.format('DD_MM_YYYY')] || [];
        return <CalendarCell
            date={date}
            today={today}
            participants={participants}
            onAddAvailability={this.handleOpen}
        />;
    }

    componentDidMount() {
        api.availability.on('value', val => {
            const availabilities = val.val();
            Object.keys(availabilities).forEach(date => {
                availabilities[date] = this.mapParticipants(availabilities[date]);
            });
            this.setState({availabilities});
        });
    }

    mapParticipants(timeParticipants) {
        return Object.keys(timeParticipants)
            .map(time => ({
                time,
                participants: Object.keys(timeParticipants[time]).map(id => ({
                    id,
                    participant: timeParticipants[time][id]
                }))
            }));
    }

    handleSave() {
        if (!this.state.timeToSave || !moment(this.state.timeToSave).isValid()) {
            alert('Invalid date!');
        } else {
            api.participate(this.state.dateToSave, this.state.timeToSave)
                .then(() => {
                    this.setState({open: false, timeToSave: null})
                });
        }
    };

    handleChangeTimePicker(event, time) {
        this.setState({timeToSave: time})
    };

    handleOpen(date) {
        this.setState({open: true, dateToSave: date});
    };

    handleClose() {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <FullCalendar
                    Select={Select}
                    fullscreen
                    dateCellRender={this.renderCalendarCell}
                    disabledDate={isWeekend}
                />
                <Dialog
                    title="Select the start time"
                    actions={this.dialogActions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

                    <TimePicker
                        format="24hr"
                        hintText="Select the time"
                        onChange={this.handleChangeTimePicker}/>
                </Dialog>
            </div>
        );
    }
}

export function isWeekend(date) {
    return date.day() === 0 || date.day() === 6;
}