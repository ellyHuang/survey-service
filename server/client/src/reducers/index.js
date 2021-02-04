import { combineReducers } from 'redux';
import authRuducer from './authRuducer';

export default combineReducers({
    auth: authRuducer,
});