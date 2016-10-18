import React from 'react';
import Paper  from 'material-ui/Paper';

const imgStyle = {
    maxHeight: '100%',
    maxWidth: '100%',
};

export const TimeRow = ({time, participants}) =>
    <div className="time-row">
        {time}: {participants.map((participant, i) =>
        <Paper key={i} zDepth={1} circle={true}>
            <img style={imgStyle} src={participant.participant.photo} alt={participant.participant.name} title={participant.participant.name}/>
        </Paper>)}
    </div>;
