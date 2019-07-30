import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth: authReducer,
    player: playerReducer
});


export default rootReducer;