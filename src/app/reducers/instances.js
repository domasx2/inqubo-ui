const initialState = []

function instanceReducer(state={steps:{}}, event) {
    const [step, action] = event.routing_key.split('.')
    return {
        workflow_id: event.workflow_id,
        workflow_instance_key: event.workflow_instance_key,
        steps: {
            ...state.steps,
            [step]: action
        }
    }
}

export default function instancesReducer(state=initialState, action) {
    switch (action.type) {
        case 'event': {
            const event = action.payload;
            if (state.filter(s => s.workflow_id === event.workflow_id
                               && s.workflow_instance_key === event.workflow_instance_key).length === 0) {
                return [instanceReducer(undefined, event), ...state]
            } else {
                return state.map(s => s.workflow_id === event.workflow_id && s.workflow_instance_key === event.workflow_instance_key ? instanceReducer(s, event) : s)
            }
        }
        default:
            return state
    }
}