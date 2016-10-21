import React from 'react';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';

import 'rc-calendar/assets/index.css';
import 'rc-select/assets/index.css';

import {CalendarCell} from './CalendarCell';
import {DialogBody} from './DialogBody';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import api from '../../api/FirebaseApi';

export class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availabilities: [],
            open: false,
            timeToSave: null,
            dateToSave: null,
        };

        this.renderCell = this.renderCell.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onTimeSelected = this.onTimeSelected.bind(this);

        this.actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
    }

    isWeekend(date) {
        return date.day() === 6 || date.day() === 0;
    }

    renderCell(date, today) {
        const hours = this.findHours(date);
        return <CalendarCell
            date={date}
            today={today}
            hours={hours}
            openDialog={this.handleOpen}
            itemClicked={this.itemClicked}
            itemHovered={this.itemHovered}/>;
    }

    itemClicked = (id, time, date) => {
        console.log('clicked', id, time, date);
        api.unparticipate(id, date, time);
    }

    itemHovered = (id) => {
        console.log('hovered', id);
    }

    handleOpen = (dateToSave) => {
        this.setState({open: true, dateToSave: dateToSave});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () => {
        const {timeToSave, dateToSave} = this.state;
        if (timeToSave && dateToSave) {
            api.participate(dateToSave, timeToSave)
                .then(() => {
                    this.setState({
                        timeToSave: null
                    });
                }, console.error);
        }
    };

    onTimeSelected = (event, time) => {
        console.log(time);
        this.setState({timeToSave: time});
    };

    findHours = (date) => {
        const availability = this.state.availabilities
            .find(hour => hour.date === date.format('DD_MM_YYYY'));
        return availability ? availability.timesObj : [];
    };

    componentDidMount() {
        api.availability
            .on('value', snap => {
                const data = snap.val();
                console.log(data);
                const avalabilities = Object.keys(data).map(dateKey => {
                    return {
                        date: dateKey,
                        timesObj: Object.keys(data[dateKey]).map(timeKey => {
                            return {
                                time: timeKey,
                                participants: Object.keys(data[dateKey][timeKey]).map(userKey => {
                                    return {
                                        id: userKey,
                                        name: data[dateKey][timeKey][userKey].name,
                                        photo: data[dateKey][timeKey][userKey].photo
                                    };
                                })
                            };
                        })
                    };
                });

                this.setState({availabilities: avalabilities});
            });
    }

    render() {
        return <div>
            <FullCalendar
                Select={Select}
                fullscreen
                dateCellRender={this.renderCell}
                disabledDate={this.isWeekend}/>

            <Dialog
                title="Add time"
                actions={this.actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>

                <DialogBody
                    onTimeSelected={this.onTimeSelected}
                    handleSave={this.handleSave}
                    findHours={this.findHours}
                    date={this.state.dateToSave}
                />
            </Dialog>
        </div>;
    }
}
