import React, {Component} from 'react';

import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Select from 'rc-select';


export class Calendar extends Component {
    render() {
        return (
            <FullCalendar Select={Select} fullscreen />
        );
    }
}
