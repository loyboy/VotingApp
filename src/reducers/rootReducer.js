import {combineReducers} from 'redux';
import {login} from './../actions/index';

const fake = function (state =  {}, action ) {
	switch(action.type) {
		case 'LOGIN' : 
			return 1;
		default :
			return 0;
	}
}

const rootReducer = combineReducers({
	fake
});

export default rootReducer;