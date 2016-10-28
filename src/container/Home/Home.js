import React, {Component} from 'react';

import {browserHistory} from 'react-router';

import EventCard from './components/EventCard';

import api from '../../api/FirebaseApi';

import './home.css';

export class Home extends Component {

    constructor() {
        super();
        this.state = {
            calendars: []
        };
    }

    componentDidMount() {
        this.dbSubscription = api.dbRef.on('value', snapshot => {
            const snap = snapshot.val();

            this.setState({
                calendars: Object.keys(snap).map(moduleId => {
                    return {
                        key: moduleId,
                        title: snap[moduleId]['_meta'].title,
                        subtitle: snap[moduleId]['_meta'].subtitle,
                        photo: snap[moduleId]['_meta'].photo,
                        description: snap[moduleId]['_meta'].description,
                    };
                })
            });
        });
    }

    navigateToCalendar = (calendarKey) => {
        api.dbRef.off('value', this.dbSubscription);
        browserHistory.push(`/calendar/${calendarKey}`)
    };

    render() {
        return (
            <div className="home">
                <h1>Welcome to CAT planner</h1>
                <h3>Available calendars</h3>

                <div className="flex-wrapper">
                    {this.state.calendars.map(calendar =>(
                        <EventCard title={calendar.title}
                                   key={calendar.key}
                                   onClick={() => this.navigateToCalendar(calendar.key)}
                                   subtitle={calendar.subtitle}
                                   photo={calendar.photo}
                                   description={calendar.description}/>))}
                </div>
            </div>
        );
    }
}