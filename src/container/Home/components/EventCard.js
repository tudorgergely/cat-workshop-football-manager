import React from 'react';

import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';

export default function EventCard({title, subtitle, description, photo, onClick}) {
    return (
        <Card onClick={onClick}>
            <CardMedia
                overlay={<CardTitle title={title} subtitle={subtitle}/>}>
                <img src={photo}
                     role="presentation"/>
            </CardMedia>

            <CardText>{description}</CardText>
        </Card>
    );
}
