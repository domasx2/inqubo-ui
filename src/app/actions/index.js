import socket from '../socket'

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

export function initWorkflow(workflow, instance, meta, payload) {
    console.log('init workflow!', workflow, instance, meta, payload)
    socket.emit('init_workflow', {workflow, instance, meta, payload})
    return {
        type: 'init_workflow',
        payload: {workflow, instance, meta, payload}
    }
}