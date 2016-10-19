import React from 'react';

import api from '../../api/FirebaseApi';

export class CalendarCell extends React.Component {

    constructor() {
        super();
        this.state = {participants: [ ]};
    }

    componentDidMount() {
        const {date} = this.props;
        api.getAvailability(date)
            .on('value', snap => {
                const participantsArray = Object.keys(snap.val() || {}) // ['13:20', ...]
                    .map(key => {
                        return {
                            time: key,
                            participants: snap.val()[key]
                        }
                    });
                console.log(participantsArray);
                this.setState({participants: participantsArray});
            });
    }

    render() {
        const {date, today} = this.props;

        return (
            <div className="calendar-cell">
                <span>{date.format('D')}</span>
                {this.state.participants
                    .map((participant, i) =>
                        <div key={i}>{participant.time} : {Object.keys(participant.participants).length}</div>
                    )}
            </div>
        );
    }
}