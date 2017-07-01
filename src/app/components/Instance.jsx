import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import {Route} from "react-router"
import InstanceGraph from "./InstanceGraph"
import StepEvents from "./StepEvents"

function Instance({workflow, instance, push, match, children=null}) {
    if (!(instance && workflow)) return <p>loading...</p>;

    function toggleStep(step) {
        console.log('toggle step', step)
        push(match.url + (step ? '/' + step : ''))
    }

    return (
        <div className="workflow-instance">
            <div className="container">
                <h1>{`${instance.workflow}.${instance.instance}`}</h1>
                <InstanceGraph workflow={workflow} instance={instance} onNodeSelect={toggleStep} />
            </div>
            <Route path={match.url + '/:step'} render={(props) => <StepEvents step={props.match.params.step} instance={instance}/>}/>
        </div>
    )
}

export default withRouter(connect((state, ownProps) => {
    const workflow_id = ownProps.match.params.workflow_id
    const instance_id = ownProps.match.params.instance_id
    return {
        workflow: state.workflows[workflow_id],
        instance: state.instances.filter(i => i.workflow === workflow_id && i.instance === instance_id)[0]
    }
}, { push })(Instance))