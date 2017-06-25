export function describeWorkflow(workflow) {
    return {
        type: 'workflow',
        payload: workflow
    }
}

export function processEvent(event) {
    return {
        type: 'event',
        payload: event
    }
}