import { combineReducers } from 'redux';
import authneticationReducer from './authentication';

const rootReducer = combineReducers({
  authenticated: authneticationReducer
});

export default rootReducer;
