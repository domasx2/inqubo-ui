const initialState = {}

export default function workflowReducer(state=initialState, action) {
    switch (action.type) {
        case 'workflow':
            return {...state, [action.payload.workflow_id]: action.payload}
        default:
            return state
    }
}