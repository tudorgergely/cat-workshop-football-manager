import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {isWeekend} from "./Calendar";
import {Participants} from './Participants';

export function CalendarCell({date, today, participants, onAddAvailability}) {
    const isThisMonth = date.month() === today.month();
    const dateIsWeekend = isWeekend(date);

    return (
        <div
            className={`calendar-cell ${date.diff(today, 'days') === 0 ? 'today' : ''} ${!isThisMonth ? 'not-this-month' : ''}`}>
            <span>{date.format('D')}</span>

            {isThisMonth && !dateIsWeekend ?
                <FloatingActionButton
                    mini={true}
                    style={{position: 'absolute', bottom: '.5em', right: '.5em'}}
                    onMouseUp={() => onAddAvailability(date)}>
                    <ContentAdd />
                </FloatingActionButton> : null}

            <Participants participants={participants} limit={3}/>
        </div>
    )
}