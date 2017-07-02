import React from 'react'
import InstanceListItem from './InstanceListItem'
import { List } from 'semantic-ui-react'

export default function InstanceList({instances, workflows}) {
    return (
        <div className="container instance-list">
            <List>
                {instances.map(instance => <InstanceListItem key={`${instance.workflow}:${instance.instance}`} instance={instance} workflow={workflows[instance.workflow]}/>)}
            </List>
        </div>
    )
}