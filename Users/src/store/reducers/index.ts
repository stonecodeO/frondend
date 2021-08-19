import {combineReducers} from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";

const staticReducers = {
    userApp: appReducer,
    userAuth: authReducer
}

const reducers = (asyncReducers?: any) => {

    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    })
}
export default reducers;


