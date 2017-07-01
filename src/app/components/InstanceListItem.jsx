import React from 'react';
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Segment, Progress } from 'semantic-ui-react'

export default function InstanceListItem({workflow, instance}) {
    const counts = {
        total: 0,
        errors: 0,
        in_progress: 0,
        completed: 0
    }

    function procStep(step) {
        counts.total += 1
        const istep = instance.steps[step.name]
        if (istep && istep.events.length) {
            const event = istep.events[0];
            if (event.name === 'start' || event.name === 'retry') {
                counts.in_progress += 1
            } else if (event.name === 'failure') {
                counts.errors += 1
            } else if (event.name === 'success') {
                counts.completed += 1
            }
        }
        (step.children || []).forEach(procStep)
    }

    procStep(workflow.initial_step)

    let color = 'yellow'
    let progress_status = 'active'
    if (counts.total === counts.completed) {
        color = 'green'
        progress_status = 'success'
    } else if (counts.in_progress) {
        color = 'blue'
    } else if (counts.errors) {
        color = 'red'
        progress_status = 'error'
    }


    return <List.Item className="instance-list-item">
            <Link to={`/${instance.workflow}/${instance.instance}`}>
                <Segment color={color}>
                    <span className="title">{`${instance.workflow}.${instance.instance}`}</span>
                    <Progress value={counts.completed} total={counts.total} progress="ratio" {...{[progress_status]: true}}/>
                </Segment>
            </Link>
    </List.Item>
}