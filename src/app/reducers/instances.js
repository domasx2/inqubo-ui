const initialState = []
const initialInstanceState = {
    steps: {},
    workflow: null,
    instance: null
}
const initialStepState = {
    events: []
}

//add event to list of step events
function stepReducer(state=initialStepState, event) {
    return {
        ...state,
        events: [event, ...state.events]
    }
}

//add or update step
function instanceReducer(state=initialInstanceState, event) {
    return {
        workflow: event.workflow,
        instance: event.instance,
        steps: {
            ...state.steps,
            [event.step]: stepReducer(state.steps[event.step] || undefined, event)
        }
    }
}

export default function instancesReducer(state=initialState, action) {
    switch (action.type) {
        case 'event': {
            const event = action.payload;
            // instance does not exist - add it
            if (state.filter(s => s.workflow === event.workflow && s.instance === event.instance).length === 0) {
                return [instanceReducer(undefined, event), ...state]
            //instance exists - update it
            } else {
                return state.map(s => s.workflow === event.workflow && s.instance === event.instance ? instanceReducer(s, event) : s)
            }
        }
        default:
            return state
    }
}