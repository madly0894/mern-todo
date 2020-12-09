import {combineReducers} from "redux";
import todo from "./todo";
import settings from "./settings";
import notifications from "./notifications";

const rootReducer = combineReducers({
    todo,
    settings,
    notifications
});

export default rootReducer;
