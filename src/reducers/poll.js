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