import {pollService} from '../services/polls';

export const pollActions = {
	getAllPolls,
	sendPoll,
	getMyPolls,
	deleteMyPoll,
	getPollById
};
function sendPoll (email, name, values) {
	
	return dispatch => {
		dispatch(request(name));
		pollService.sendPoll(email,name,values).then(data => {

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

function getMyPolls(email) {
	return dispatch => {
		dispatch(request(email));
		pollService.getMyPolls(email).then(data => {
			if(data.ok) {
				dispatch(success(data.message));
			}
			else{
				dispatch(failure(data.message));
			}
		});
	};
	function request(email) {
		return {
			type:"GET_MY_POLLS_REQUEST",
			email
		};
	}
	function success(email) {
		return {
			type:"GET_MY_POLLS_SUCCESS",
			email
		};
	}
	function failure(error) {
		return {
			type:"GET_MY_POLLS_FAILURE",
			error
		};
	}
}
function deleteMyPoll(email,name) {
	return dispatch => {
		dispatch(request(name));
		pollService.deleteMyPoll(email,name).then(data => {
			if(data.ok) {
				dispatch(success(data.message));
			}
			else {
				dispatch(failure(data.message));
			}
		});
	}
	function request(name) {
		return {
			type:"DELETE_MY_POLL_REQUEST",
			name
		};
	}
	function success(name) {
		return {
			type:"DELETE_MY_POLL_SUCCESS",
			name
		};
	}
	function failure(name) {
		return {
			type:"DELETE_MY_POLL_FAILURE",
			name
		};
	}
}
function getAllPolls () {
	return dispatch => {
		dispatch(request());
		pollService.getAllPolls().then(data => {
			if(data.ok) {
				dispatch(success(data.message));
			}
			else {
				dispatch(failure(data.message));
			}
		});
		
	}

	function request() {
		return {
			type:"GET_ALL_POLLS_REQUEST"
		};
	}
	function success(data) {
		return {
			type:"GET_ALL_POLLS_SUCCESS",
			data
		};
	}
	function failure(error) {
		return {
			type:"GET_ALL_POLLS_FAILURE",
			error
		};
	}
} 
function getPollById (id) {
	return dispatch => {
		dispatch(request());
		pollService.getPollById(id).then(data => {
			if(data.ok) {
				dispatch(success(data.message));
			}
			else {
				dispatch(failure(data.message));
			}
		});
		
	}

	function request() {
		return {
			type:"GET_POLL_ID_REQUEST"
		};
	}
	function success(data) {
		return {
			type:"GET_POLL_ID_SUCCESS",
			data
		};
	}
	function failure(error) {
		return {
			type:"GET_POLL_ID_FAILURE",
			error
		};
	}
} 