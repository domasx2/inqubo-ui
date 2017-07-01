import React from 'react';
import { connect } from 'react-redux';
import InstanceListItem from './InstanceListItem'
import { List } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

function InstanceList({instances, workflows}) {
    return (
        <div className="container instance-list">
            <List>
                {instances.map(instance => <InstanceListItem key={`${instance.workflow}:${instance.instance}`} instance={instance} workflow={workflows[instance.workflow]}/>)}
            </List>
        </div>
    )
}

export default withRouter(connect(state => {console.log('state', state); return state;})(InstanceList))

