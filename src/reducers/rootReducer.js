import {combineReducers} from 'redux';
import {login} from './../actions/index';
import {auth,register} from './auth';

const rootReducer = combineReducers({
	auth,
	register
});

export default rootReducer;