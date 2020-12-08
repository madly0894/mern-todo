import {combineReducers} from "redux";
import reducers from "./reducers";
import settings from "./settings";

const rootReducer = combineReducers({
    reducers,
    settings
});

export default rootReducer;
