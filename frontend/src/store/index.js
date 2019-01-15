import { combineReducers } from "redux";
import user from "./user";
import tasks from "./task";

const reducers = combineReducers({
    // Reducers go here
    user,
    tasks
});

export default reducers;
