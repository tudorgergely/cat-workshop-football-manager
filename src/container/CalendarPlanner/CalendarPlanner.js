import React, {Component} from 'react';

import {Calendar} from './components/Calendar';

import './calendar-planner.css';

export class CalendarPlanner extends Component {

    render() {
        return (
            <div>
                <Calendar moduleId={this.props.routeParams.activity}/>
            </div>
        );
    }
}