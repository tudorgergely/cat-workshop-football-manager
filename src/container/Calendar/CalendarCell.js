import React from 'react';

import {TimeRow} from './TimeRow';

export function CalendarCell(props) {
    const {date, today, hours} = props;

    return (
        <div className="calendar-cell">
            <span>{date.format('D')}</span>
            {hours.map((timeRow, i) =>
                <TimeRow key={i} timeRow={timeRow}/>
            )}
        </div>
    );
}