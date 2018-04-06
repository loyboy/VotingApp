import {combineReducers} from 'redux';
import {login} from './../actions/index';
import {auth} from './auth';

const rootReducer = combineReducers({
	auth
});

export default rootReducer;