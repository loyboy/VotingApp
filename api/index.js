var express = require("express");

module.exports = (() => {
	let api = express.Router();

	api.post("/login",function (req,res,next){

		var result = {};
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
		console.log("register");
		next();
	});
	return api;
});



function authenticate(body) {
	console.log(JSON.stringify(body))
	return new Promise((resolve,reject) => {
		let user = {};
		if(body.email == "ramintagizade@mail.ru" && body.password=="pass"){
			user = {
				id:1,
				username:"ramin",
				email:'ramintagizade@mail.ru',
			};
			let resJSON = {
				id:user.id,
				username:user.username,
				email:user.email,
				token:'login-token'
			};
			resolve({ok:true,json:() => resJSON});
		}
		else {
			reject({ok:false,message: "Email or password is wrong."});
			return;
		}
	});
}
