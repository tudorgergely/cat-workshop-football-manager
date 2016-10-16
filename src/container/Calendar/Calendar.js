import React, {Component} from 'react';

import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';

import {CalendarCell} from './CalendarCell';


export class Calendar extends Component {

    renderCalendarCell(date, today) {
        return <CalendarCell
            date={date}
            today={today}
        />;
    }

    disableWeekends(date) {
        return date.day() === 0 || date.day() === 6;
    }

    render() {
        return (
            <FullCalendar
                Select={Select}
                fullscreen
                dateCellRender={this.renderCalendarCell}
                disabledDate={this.disableWeekends}
            />
        );
    }
}
