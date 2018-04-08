import {combineReducers} from 'redux';
import {login} from './../actions/index';
import {auth,register,alert} from './auth';

const rootReducer = combineReducers({
	auth,
	register,
	alert
});

export default rootReducer;