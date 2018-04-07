

export function auth (state = {}, action ) {
	switch(action.type) {
		case 'LOGIN_REQUEST' : 
			return {
				loggingIn:true,
				user:action.user
			};
		case 'LOGIN_SUCCESS' : 
			return {
				loggedIn:true,
				user:action.user
			};
		case 'LOGIN_FAILURE' : 
			return {};
		default :
			return state;
	}
}

export function register (state = {}, action ) {
	switch(action.type) {
		case 'REGISTER_REQUEST' : 
			return {
				registeringIn:true,
				user:action.user
			};
		case 'REGISTER_SUCCESS' : 
			return {
				registeredIn:true,
				user:action.user
			};
		case 'REGISTER_FAILURE' : 
			return {};
		default :
			return state;
	}
}