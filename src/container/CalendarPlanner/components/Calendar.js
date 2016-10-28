import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';
import 'rc-calendar/assets/index.css';
import 'rc-select/assets/index.css';

import moment from 'moment';

import {CalendarCell} from './CalendarCell';
import {DialogBody} from './DialogBody';

import api from '../../../api/FirebaseApi';

export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availabilities: {},
            open: false,
            currentDate: null,
        };

        this.actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
    }

    static isWeekend(date) {
        return date.day() === 6 || date.day() === 0;
    }

    getHours(date) {
        return this.state.availabilities[date.format('DD_MM_YYYY')] || [];
    }

    renderCell = (date, today) => {
        return <CalendarCell
            date={date}
            today={today}
            hours={this.getHours(date)}
            openDialog={this.handleOpen}
            itemClicked={this.itemClicked}
            itemHovered={this.itemHovered}/>;
    };

    itemClicked = (id, time, date) => {
        const {moduleId} = this.props;
        api.unparticipate(moduleId, id, date, time);
    };

    itemHovered = (id) => {
    };

    handleOpen = (currentDate) => {
        this.setState({open: true, currentDate: currentDate});
    };

    handleClose = () => {
        this.setState({open: false, currentDate: null});
    };

    handleSave = (dateToSave, timeToSave) => {
        const {moduleId} = this.props;

        console.log(dateToSave, timeToSave);

        if (timeToSave && dateToSave) {
            api.participate(moduleId, dateToSave, timeToSave)
                .then(null, console.error);
        }
    };

    mapData = snap => {
        const data = snap.val();
        const avalabilities = {};

        Object.keys(data).forEach(dateKey => {
            avalabilities[dateKey] = Object.keys(data[dateKey]).map(timeKey => {
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
            });
        });

        this.setState({availabilities: avalabilities});
    };

    componentDidMount() {
        const {moduleId} = this.props;
        api.availability(moduleId)
            .on('value', this.mapData);
    }

    componentWillReceiveProps(nextProps) {
        const {moduleId} = this.props;
        api.availability(moduleId)
            .off('value', this.mapData);
        this.setState({availabilities: {}});
        api.availability(nextProps.moduleId)
            .on('value', this.mapData);
    }

    render() {
        return <div>
            <FullCalendar
                Select={Select}
                fullscreen
                dateCellRender={this.renderCell}
                disabledDate={Calendar.isWeekend}/>

            <Dialog
                title={moment(this.state.currentDate).toString()}
                actions={this.actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>

                {this.state.currentDate ? <DialogBody
                    handleSave={this.handleSave}
                    hours={this.getHours(this.state.currentDate)}
                    date={this.state.currentDate}
                /> : null}
            </Dialog>
        </div>;
    }
}
