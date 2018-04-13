export function poll (state = {}, action ) {
	switch(action.type) {
		case "SEND_POLL_REQUEST" :
			return {
				creating_poll:true,
			};
		case "SEND_POLL_SUCCESS" :
			return {
				created_poll:true
			};
		case "SEND_POLL_FAILURE" :
			return {
				error:action.error
			};
		default :
			return state;	
	}
}

export function getMyPolls (state ={} ,action ) {
	switch(action.type) {
		case "GET_MY_POLLS_REQUEST" :
			return {
				getting_polls:true,
			};
		case "GET_MY_POLLS_SUCCESS" : 
			return {
				got_polls: true,
				data:action
			};
		case "GET_MY_POLLS_FAILURE" : 
			return {
				error:action.error
			};
		default:
			return state;
	}
}
export function deleteMyPoll(state = {}, action ) {
	switch(action.type) {
		case "DELETE_MY_POLL_REQUEST": 
			return {
				deleting_poll:true,
			};
		case "DELETE_MY_POLL_SUCCESS" : 
			return {
				deleted_poll:true,
				name:action.name
			};
		case "DELETE_MY_POLL_FAILURE" :
			return {
				error:action.error
			};
		default :
			return state;
	}
}