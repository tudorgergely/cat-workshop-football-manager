import React from 'react';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';

import 'rc-calendar/assets/index.css';
import 'rc-select/assets/index.css';

import {CalendarCell} from './CalendarCell';

import api from '../../api/FirebaseApi';

export class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availabilities: []
        };

        this.renderCell = this.renderCell.bind(this);
    }

    isWeekend(date) {
        return date.day() === 6 || date.day() === 0;
    }

    renderCell(date, today) {
        const availability = this.state.availabilities
            .find(hour => hour.date === date.format('DD_MM_YYYY'));
        const hours = availability ? availability.timesObj : [ ];
        return <CalendarCell date={date} today={today} hours={hours}/>;
    }

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
        return <FullCalendar
            Select={Select}
            fullscreen
            dateCellRender={this.renderCell}
            disabledDate={this.isWeekend}/>;
    }
}