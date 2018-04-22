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
export function getAllPolls(state = {} , action) {
	switch(action.type) {
		case "GET_ALL_POLLS_REQUEST" : 
			return {
				getting_all_polls:true,
			};
		case "GET_ALL_POLLS_SUCCESS" : 
			return {
				got_all_polls:true,
				polls:action.data
			};
		case "GET_ALL_POLLS_FAILURE" :
			return {
				error:action.error
			};
		default :
			return state;
	}	
}
export function getPollById(state = {} , action) {
	switch(action.type) {
		case "GET_POLL_ID_REQUEST" : 
			return {
				getting_poll_id:true,
			};
		case "GET_POLL_ID_SUCCESS" : 
			return {
				got_poll_id:true,
				poll:action.data
			};
		case "GET_POLL_ID_FAILURE" :
			return {
				error:action.error
			};
		default :
			return state;
	}	
}
export function vote(state = {} , action) {
	switch(action.type) {
		case "VOTE_REQUEST" : 
			return {
				voting:true,
			};
		case "VOTE_SUCCESS" : 
			return {
				voted:true,
				poll:action.data
			};
		case "VOTE_FAILURE" :
			return {
				error:action.error
			};
		default :
			return state;
	}	
}