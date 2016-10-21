import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {TimeRow} from './TimeRow';

export function DialogBody({onTimeSelected, handleSave, findHours, date}) {
    return (
        <div>
            <div >
                <TimePicker style={{float: 'left'}}
                    format="24hr"
                    hintText="Select time"
                    onChange={onTimeSelected}
                />
                <FloatingActionButton
                    mini={true}
                    onMouseUp={handleSave}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
            <br/>
            {date ? findHours(date).map((timeRow, i) =>
                <TimeRow key={i} timeRow={timeRow}/>
            ) : null}
        </div>
    );

}