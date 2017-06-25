import { combineReducers } from 'redux';
import workflows from './workflows';
import instances from "./instances";

const rootReducer = combineReducers({
    workflows,
    instances
});

export default rootReducer;
