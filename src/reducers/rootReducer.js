import {combineReducers} from 'redux';
import {login} from './../actions/index';
import {auth,register,alert} from './auth';
import {poll} from './poll';

const rootReducer = combineReducers({
	auth,
	register,
	alert,
	poll
});

export default rootReducer;