
export const userActions = {
	login
};	

function login(username,password) {
	console.log("requested "  + username)
	return dispatch => {
		dispatch(request(username));
	};

	function request(username) {
		console.log("requested for login " + username) ;
		return {
			type:"LOGIN"
		}
	}
}
