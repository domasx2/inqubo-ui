import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import InstanceList from "./InstanceList"
import TriggerWorkflowModal from "./TriggerWorkflowModal"
import { initWorkflow } from '../actions'

function IndexContainer({instances, workflows, initWorkflow}) {

    return (
        <div className="index">
            <div className="container index-header">
                <TriggerWorkflowModal workflows={workflows} submit={form => {console.log('submit', form); initWorkflow(form.workflow, form.instance, form.meta, form.payload)}}/>
            </div>
            <InstanceList instances={instances} workflows={workflows}/>
        </div>
    )
}

export default withRouter(connect(state => state, { initWorkflow })(IndexContainer))