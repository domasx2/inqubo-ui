export function describeWorkflow(workflow) {
    console.log(`got workflow ${workflow.workflow_id}`)
    return {
        type: 'workflow',
        payload: workflow
    }
}

export function processEvent(event) {
    console.log(`got event ${event.workflow}.${event.instance}.${event.step}.${event.name}`)
    return {
        type: 'event',
        payload: event
    }
}