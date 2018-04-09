import {userService} from '../services/index';
import { createBrowserHistory } from 'history';
import {alert} from './alert';

const history = createBrowserHistory();

export const userActions = {
	login,
	register,
	logout,
	sendPoll
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
					dispatch(alert.error(user));
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

function register(username, email,password) {

	return dispatch => {
		dispatch(request(email));
		userService.register(username,email,password).then(
			user =>  {
				if(user.token) {
					dispatch(success(user));
					dispatch(alert.success("Successfully registered"));
					// redirect to home page 
					history.push("/");
					window.location.reload();
					
				}
				else {
					dispatch(failure(user));
					dispatch(alert.error(user));
				}
			}
		);
	};

	function request(user) {
		return {
			type:"REGISTER_REQUEST",
			user
		};
	}
	function success(user) {
		return {
			type : "REGISTER_SUCCESS",
			user
		};
	}
	function failure(error) {
		return {
			type: "REGISTER_FAILURE",
			error
		};
	}
}
function logout() {
	userService.logout();
	return {
		type:"LOGOUT"
	};
}

function sendPoll (email, name, values) {
	console.log("email " + email +" " + name + " " + values);
	
	return dispatch => {
		dispatch(request(name));
		userService.sendPoll(email,name,values).then(data => {
			console.log("actino " + JSON.stringify(data))
			if(data.ok) {
				dispatch(success(data.message));
			}
			else {
				dispatch(failure(data.message));
			}
		});
	};


	function request(poll) {
		return {
			type:"SEND_POLL_REQUEST",
			poll
		};
	}
	function success(poll) {
		return {
			type:"SEND_POLL_SUCCESS",
			poll
		};
	}
	function failure(error) {
		return {
			type:"SEND_POLL_FAILURE",
			error
		};
	}
}