var express = require("express");

module.exports = (() => {
	let api = express.Router();

	api.post("/login",function (req,res,next){
		console.log("receive login request  " + req.body.email );
		var result = {};
		res.setHeader('Content-Type', 'application/json');
		var ans = authenticate(req.body).then(data=> {
			if(data.ok) {
				result = {
					ok : true,
					message: "Success"
				};
			}
			else {
				result = {
					ok:false,
					message: "Error"
				};
			}
    		res.send(JSON.stringify(result));
    		next();
		});
	});
	api.post("/register",function(req,res,next) {
		console.log("register");
		next();
	});
	return api;
});

function authenticate(data) {
	return new Promise( (resolve,reject) => {
		setTimeout(() => {
		if(data.email === "ramintagizade@mail.ru" && data.password === "pass") 
			resolve({ok:true,status:"success"});
		else {
			reject({ok:false,status:"error"});
		}
		},100); 
	});
}