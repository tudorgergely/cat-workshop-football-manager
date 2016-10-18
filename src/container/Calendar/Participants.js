import React from 'react';
import {TimeRow} from './TimeRow';

export function Participants({participants, limit}) {
    let timeRows;
    if (!limit) {
        timeRows = participants.map(participant =>
            <TimeRow key={participant.time} time={participant.time} participants={participant.participants}/>
        );
    } else {
        timeRows = participants.slice(0, limit).map(participant =>
            <TimeRow key={participant.time} time={participant.time} participants={participant.participants}/>
        );
    }
    const remaining = participants.length - limit;
    return (
        <div>
            {timeRows}
            {remaining > 0 ? `and ${remaining} more` : ''}
        </div>
    );
}