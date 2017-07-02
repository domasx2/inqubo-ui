import React from 'react'
import moment from 'moment';
import {Item} from "semantic-ui-react";


export default function StepEvents({step, instance}) {
    console.log('step', step, instance)
    const events = instance.steps[step] ? instance.steps[step].events : []
    return <div className="step-events container">
        <Item.Group divided>
            { events.map((event, idx) => <Item key={idx}>
                <Item.Content>
                    <Item.Header>{event.name}</Item.Header>
                    <Item.Meta>{moment.unix(event.timestamp).format()}</Item.Meta>
                    <Item.Content>{JSON.stringify(event.payload, null, 2)}</Item.Content>
                </Item.Content>
            </Item>) }
        </Item.Group>
    </div>
}