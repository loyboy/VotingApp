var express = require("express");
var user = require("../db/index").user;
var poll = require("../db/index").poll;
var jwt = require("jsonwebtoken");

module.exports = (() => {
	let api = express.Router();

	api.post("/login",function (req,res,next){
		res.setHeader('Content-Type', 'application/json');
		authenticate(req.body).then(data => {
			return data.json();
		}).then(user=> {
			res.send(JSON.stringify(user));
			next();
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});

	api.post("/register",function(req,res,next) {
		res.setHeader('Content-Type', 'application/json');
		register(req.body).then(data => {
			return data.json();
		}).then(user=> {
			res.send(JSON.stringify(user));
			next();
		}).catch(err=>{
			res.send(JSON.stringify(err));
			next();
		});
	});

	api.post("/sendPoll",function (req,res,next) {
		res.setHeader("Content-Type","application/json");
		createPoll(req.body).then(data => {
			return data.json();
		}).then(poll => {
			res.send(JSON.stringify(poll));
			next();
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});

	api.post("/myPolls",function(req,res,next) {
		res.setHeader("Content-Type","application/json");
		getMyPolls(req.body.email).then(data => {
			return data.json();
		}).then(polls => {
			res.send(JSON.stringify(polls));
			next();
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});

	api.delete("/deletePoll",function (req,res,next){
		res.setHeader("Content-Type","application/json");
		deleteMyPoll(req.body).then(data => {
			return data.json();
		}).then(message => {
			res.send(JSON.stringify(message));
			next();
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});
 
	api.post("/poll/id",function(req,res,next) {
		res.setHeader("Content-Type","application/json");
		getPollById(req.body.id).then(data => {
			return data.json();
		}).then(poll => {
			res.send(JSON.stringify(poll));
		}).catch(err => {
			res.send(JSON.stringify(err));
		});
	});

	api.get("/allPolls",function (req,res,next) {
		res.setHeader("Content-Type","application/json");
		getAllPolls().then(data => {
			return data.json();
		}).then(polls => {
			res.send(JSON.stringify(polls));
		}).catch(err => {
			res.send(JSON.stringify(err));
		});
	});

	api.post("/vote/id",function(req,res,next) {
		res.setHeader("Content-Type","application/json");
		let ip = req.connection.remoteAddress;

		checkVotersByIp(req.body.id,ip).then(ok => {
				return ok.json();
			}).then(check => {
					vote(req.body).then(data => {
						return data.json();
					}).then(poll => {
						res.send(JSON.stringify(poll));
					}).catch(err => {
						res.send(JSON.stringify(err));
					});
			}).catch(err => {
				res.send(JSON.stringify(err));
		});
	});

	return api;
});



function authenticate(body) {
	
	return new Promise((resolve,reject) => {
		user.findUser(body.email,body.password).then(res => {
			if(res) {
				let token = jwt.sign({
				  exp: Math.floor(Date.now() / 1000) + (60 * 60),
				  data: 'voting-app'
				}, 'secret');
				res.token = token;
				resolve({ok:true,json:() => res});
			}
		}).catch(err => {
			reject({ok:false,message: "Email or password is wrong."});
		});
	});
}

function register(body) {
	return new Promise((resolve,reject) => {
		user.createUser(body).then(res => {
			if(res) {
				let token = jwt.sign({
				  exp: Math.floor(Date.now() / 1000) + (60 * 60),
				  data: 'voting-app'
				}, 'secret');
				res.token = token;
				resolve({ok:true,json:()=>res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
}

function createPoll(body){
	return new Promise((resolve,reject) => {
		poll.createPoll(body).then(res => {
			if(res) {
				resolve({ok:true,json:()=>res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
}
function getMyPolls(email) {
	
	return new Promise((resolve,reject) => {
		poll.getMyPolls(email).then(res => {
			if(res) {
				resolve({ok:true,json:() => res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
}
function deleteMyPoll(body) {
	const {email,name} = body;
	return new Promise((resolve,reject) => {
		poll.deleteMyPoll(email,name).then(res => {
			if(res) {
				resolve({ok:true,json:()=>res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
} 

function getPollById(id) {
	return new Promise((resolve,reject) => {
		poll.getPollById(id).then(res => {
			if(res) {
				resolve({ok:true,json:() => res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
} 
function getAllPolls() {
	return new Promise((resolve,reject) => {
		poll.getAllPolls().then(res => {
			if(res) {
				resolve({ok:true,json:() => res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
}
function vote(body) {
	const {id,value} = body;
	return new Promise((resolve,reject) => {
		poll.vote(id,value).then(res => {
			if(res) {
				resolve({ok:true,json:() => res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
}
function checkVotersByIp(id,ip) {
	return new Promise((resolve,reject) => {
		poll.checkVotersByIp(id,ip).then(res => {
			if(res){
				resolve({ok:true,json:() => res});
			}
		}).catch(err => {
			reject({ok:false,message:err.message});
		});
	});
}