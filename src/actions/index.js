import {userService} from '../services/index';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const userActions = {
	login
};	

function login(email,password) {

	return dispatch => {
		dispatch(request(email));
		userService.login(email,password).then(
			user =>  {
				if(user.token) {
					dispatch(success(user));
					// redirect to home page 
					history.push("/");
					window.location.reload();
					
				}
				else {
					dispatch(failure(user));
				}
			}
		);
	};

	function request(user) {
		return {
			type:"LOGIN_REQUEST",
			user
		};
	}
	function success(user) {
		return {
			type : "LOGIN_SUCCESS",
			user
		};
	}
	function failure(error) {
		return {
			type: "LOGIN_FAILURE",
			error
		};
	}
}
