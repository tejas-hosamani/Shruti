import { combineReducers } from 'redux';
import authReducer from './authReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer
});

export default rootReducer;
