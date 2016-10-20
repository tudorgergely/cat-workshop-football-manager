import React from 'react';

export function TimeRow(props) {
    const {timeRow} = props;

    return (
        <div>{timeRow.time} : {timeRow.participants.length}</div>
    );
}