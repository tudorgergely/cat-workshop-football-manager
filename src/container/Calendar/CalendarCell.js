import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {TimeRow} from './TimeRow';

export function CalendarCell(props) {
    const {date, today, hours, openDialog, itemClicked, itemHovered} = props;
    const dateWeekend = date.day() === 6 || date.day() === 0;
    const dateThisMonth = date.month() === today.month();

    return (
        <div className="calendar-cell">
            <span>{date.format('D')}</span>
            {hours.map((timeRow, i) =>
                <TimeRow
                    key={i}
                    timeRow={timeRow}
                    onItemClicked={(id, time) => itemClicked(id, time, date)}
                    onItemHovered={itemHovered}/>
            )}

            {dateThisMonth && !dateWeekend ?
                <FloatingActionButton
                    mini={true}
                    style={{position: 'absolute', bottom: '.5em', right: '.5em'}}
                    onMouseUp={() => openDialog(date)}>
                    <ContentAdd />
                </FloatingActionButton> : null}
        </div>
    );
}