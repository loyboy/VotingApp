import {combineReducers} from 'redux';
import {login} from './../actions/index';
import {auth,register,alert} from './auth';
import {poll,getMyPolls,deleteMyPoll,getAllPolls,getPollById} from './poll';

const rootReducer = combineReducers({
	auth,
	register,
	alert,
	poll,
	getMyPolls,
	deleteMyPoll,
	getAllPolls,
	getPollById
});

export default rootReducer;