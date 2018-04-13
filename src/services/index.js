export const userService = {
	login,
	logout,
	register,
	sendPoll,
	getMyPolls,
	deleteMyPoll
};

function login(email, password) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({email,password})
	};

	return fetch('/login', opts).then(res => {
		if(!res.ok) {
			return Promise.reject(res.statusText)
		}
		return res.json(); 
	}).then( user => {
		if(user && user.token) {
			localStorage.setItem('user', JSON.stringify({token:user.token,email:user.email}));
		}
		return user;
	})
}

function register(username, email, password) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({username, email, password})
	};

	return fetch('/register', opts).then(res => {
		if(!res.ok) {
			return Promise.reject(res.statusText)
		}
		return res.json(); 
	}).then( user => {
		if(user && user.token) {
			localStorage.setItem('user', JSON.stringify({token:user.token,email:user.email}));
		}
		return user;
	})
}

function logout() {
	localStorage.removeItem("user");
	window.location.href="/";
}

function sendPoll(email,name,values) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({email, name, values})
	};
	return fetch("/sendPoll",opts).then(res => {
		if(!res.ok) return Promise.reject(res.statusText);
		return res.json();
	}).then(poll => {
		return poll;
	});	
}

function getMyPolls(email) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({email})
	};
	return fetch("/myPolls",opts).then(res => {
		if(!res.ok) return Promise.reject(res.statusText);
		return res.json();
	}).then(polls => {
		return polls;
	});
}
function deleteMyPoll(email,name) {
	const opts = {
		method:"DELETE",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify({email,name})
	};
	return fetch("/deletePoll",opts).then(res => {
		if(!res.ok) return Promise.reject(res.statusText);
		return res.json();
	}).then(message => {
		return message;
	});
}