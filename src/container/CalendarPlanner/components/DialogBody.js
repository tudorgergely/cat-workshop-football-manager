import React, {Component} from 'react';
import TimePicker from 'material-ui/TimePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {TimeRow} from './TimeRow';

export class DialogBody extends Component {
    constructor() {
        super();
        this.state = {selectedTime: null};
    }

    onTimeSelected = (event, selectedTime) => {
        this.setState({selectedTime});
    };

    render() {
        const {handleSave, hours, date} = this.props;
        const {selectedTime} = this.state;
        return (
            <div>
                <div >
                    <TimePicker style={{float: 'left'}}
                                format="24hr"
                                hintText="Select time"
                                onChange={this.onTimeSelected}
                    />
                    <FloatingActionButton
                        mini={true}
                        onMouseUp={() => handleSave(date, selectedTime)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <br/>
                {hours.map((timeRow, i) =>
                    <TimeRow key={i} timeRow={timeRow}/>
                )}
            </div>
        );
    }
}
