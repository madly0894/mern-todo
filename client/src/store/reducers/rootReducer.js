import {combineReducers} from "redux";
import reducers from "./reducers";
import settings from "./settings";
import notifications from "./notifications";

const rootReducer = combineReducers({
    reducers,
    settings,
    notifications
});

export default rootReducer;
