import React from 'react';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';

import 'rc-calendar/assets/index.css';
import 'rc-select/assets/index.css';

import {CalendarCell} from './CalendarCell';

export class Calendar extends React.Component {
    isWeekend(date) {
        return date.day() === 6 || date.day() === 0;
    }

    renderCell(date, today) {
        return <CalendarCell date={date} today={today}/>;
    }

    render() {
        return <FullCalendar
            Select={Select}
            fullscreen
            dateCellRender={this.renderCell}
            disabledDate={this.isWeekend}/>;
    }
}