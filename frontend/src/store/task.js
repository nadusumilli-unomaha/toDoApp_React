import {
    REQUEST_TASK_ERROR,
    REQUEST_TASK_LOADING,
    REQUEST_TASK_SUCCESS
} from "../actions/tasks";

// Provides the initial state for the task model
// This is paseed to components as initial state.
const initial_state = {
    data: null,
    error: null
};

/** Function: tasks
 *  Arguments:
 *      - state: The state of the task model.
 *      - action: The type and payload from the task actions.
 *  Defenition:
 *      This function checks the type of action and based on
 *      the type it performs changes to the task models state.
 *  Returns:
 *      - state: the state of the task model.
 **/
const tasks = (state = initial_state, action) => {
    switch (action.type) {
        case REQUEST_TASK_SUCCESS:
            return {
                data: action.payload.results,
                error: action.payload.error
            };
        case REQUEST_TASK_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case REQUEST_TASK_LOADING:
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
};

export default tasks;
