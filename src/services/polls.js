export const pollService = {
	getAllPolls,
	sendPoll,
	getMyPolls,
	deleteMyPoll,
	getPollById,
	vote
};

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

function getAllPolls() {
	const opts = {
		method:"GET",
		headers: {"Content-Type": "application/json"},
	};

	return fetch("/allPolls",opts).then(res =>{
		if(!res.ok) return Promise.reject(res.statusCode);
		return res.json(); 
	}).then(data => {
		return data;
	})
}
function getPollById(id) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({id})
	};
	return fetch("/poll/id",opts).then(res => {
		if(!res.ok) return Promise.reject(res.statusText);
		return res.json();
	}).then(poll => {
		return poll;
	});
}
function vote(id,value) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({id,value})
	};
	return fetch("/vote/id",opts).then(res => {
		if(!res.ok) return Promise.reject(res.statusText);
		return res.json();
	}).then(poll => {
		return poll;
	});
}