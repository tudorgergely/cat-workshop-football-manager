import React from 'react';
import Paper from 'material-ui/Paper';

const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%'
};

export function TimeRow(props) {
    const {timeRow, onItemHovered, onItemClicked} = props;

    return (
        <div className="time-row">
            {timeRow.time} : {timeRow.participants.map((p, i) => {
            return <Paper
                key={i}
                circle={true}
                onClick={() => onItemClicked && onItemClicked(p.id, timeRow.time)}
                onMouseOver={() => onItemHovered && onItemHovered(p.id, timeRow.time)}>

                <img style={imgStyle} src={p.photo} title={p.name} alt={p.name}/>
            </Paper>
        })
        }</div>
    );
}