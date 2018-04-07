var express = require("express");
var user = require("../db/index").user;
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
		user.createUser(body).then(res=> {
			if(res) {
				let token = jwt.sign({
				  exp: Math.floor(Date.now() / 1000) + (60 * 60),
				  data: 'voting-app'
				}, 'secret');
				res.token = token;
				resolve({ok:true,json:()=>res});
			}
		}).catch(err => {
			reject({ok:false,message:"Error occured during register"});
		});
	});
}