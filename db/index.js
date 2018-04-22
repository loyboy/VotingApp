var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");
var ObjectId = require('mongodb').ObjectID;

var db_name = process.env.Db_Name || 'voting-app';
var db_host = process.env.Db_Host || 'localhost';
var db_port = process.env.Db_Port || '27017';
if(process.env.NODE_ENV !== 'production')
	var url = 'mongodb://'+db_host+':'+db_port;
else {
	var dbuser = process.env.user;
	var dbpassword = process.env.password;
	var url = "mongodb://"+dbuser+":"+dbpassword+"@ds253889.mlab.com:53889/voting-app";
}
var db = null;
var client = null;

MongoClient.connect(url, function(err, client) {
  if(err) console.log(err);
  db = client.db(db_name);
  client = client;
});

exports.user = {
	findUser,
	createUser,
	insertTokens,
	getToken
};

exports.poll = {
	createPoll,
	getMyPolls,
	deleteMyPoll,
	getPollById,
	getAllPolls,
	vote,
	checkVotersByIp
};

function findUser(email,password) {
	
	return new Promise((resolve,reject)=> { 
		db.collection("users").findOne({email:email},function(err,res){
			if(res) {
				if(bcrypt.compareSync(password, res.password)){
					resolve(res);
				}
				else {
					reject({ok:false,message:"Password is wrong ."});
				}
			}
			else { 
				reject({ok:false,message:"No user exists. "});
			}
		});
	})
}

function createUser(user) {

	let account = {
				username:user.username,
				email:user.email,
				password:bcrypt.hashSync(user.password, 10),
				createdAt:new Date()
	};
	return new Promise((resolve,reject)=> {
		db.collection("users").findOne({email:account.email},function (err,res) {
			if(res){
				// user exists 
				reject({ok:false,message:"User exists "});
				
			}
			else {
				db.collection("users").insertOne(account,function(err,res){
					if(err) reject({ok:false,message:"Insertion error "});
					if(res)
						resolve({ok:true,message:"User is created "});
					
				});
			}

		});
	});
}

function insertTokens(token , email) {
	let tokenData = {
		token:token,
		email:email,
		createdBy:new Date()
	};
	return new Promise((resolve,reject) => {
			db.collection("tokens").update({email:email},tokenData,{upsert: true},function(err,res){
				if(res) {
					resolve({ok:true,message:res});
				}
				if(err) reject({ok:false,message:err});
			});
	});
}
function getToken(email) {
	return new Promise((resolve,reject) => {
		db.collection("tokens").findOne({email:email},function(err,res){
			if(err) reject({ok:false,message:err});
			resolve({ok:true,token:res.token});
		});
	});
}
function createPoll(poll) {
	let values = [...poll.values];
	for(let i=0;i<poll.values.length;i++) {
		values[i] = {
			name:poll.values[i],
			votes:1
		}
	};
	poll.values = values;
	let pollJSON = {
		name:poll.name,
		values:poll.values,
		createdBy:poll.email,
		createdAt:new Date()
	};
	return new Promise((resolve,reject) => {
		db.collection("polls").findOne({name:pollJSON.name,createdBy:pollJSON.createdBy},function(err,res){
			if(res) {
				reject({ok:false,message:"Poll has already been created"});
			}
			else {
				db.collection("polls").insertOne(pollJSON,function(err,res){
					if(err) reject({ok:false,message:"Poll creation error"});
					if(res)
						resolve({ok:true,message:"Poll is created"});
				});
			}
		});
	});
}

function getMyPolls (email) {
	return new Promise((resolve,reject) => {
		db.collection("polls").find({createdBy:email}).toArray(function(err,res){
			if(err) reject({ok:false,message:err});
			if(!res.length) reject({ok:false,message:"You don't have any polls"});
			if(res) 
				resolve({ok:true,message:res});
		});
	});
}

function deleteMyPoll(email,name) {
	return new Promise((resolve,reject) => {
		db.collection("polls").remove({createdBy:email,name:name},function(err,res){
			if(err) reject({ok:false,message:err});
			if(res) 
				resolve({ok:true,message:{name:name,message:"Deleted successfully"}});
		});
	})
}

function getPollById(id) {
	return new Promise((resolve,reject) => {
		db.collection("polls").findOne({_id:ObjectId(id)},function(err,res) {
			if(err ) {
				reject({ok:false,message:err});
			}
			if(!res) reject({ok:false,message:"Poll was not found "});
			if(res) {
				resolve({ok:true,message:res});
			}
		}); 
	});
}
function getAllPolls () {
	return new Promise((resolve,reject) => {
		db.collection("polls").find({}).toArray(function(err,res){
			if(err) {
				reject({ok:false,message:err});
			}
			if(!res) reject({ok:false,message:"No polls available"});
			if(res) {
				resolve({ok:true,message:res});
			}
		});
	});
}
function vote(id,value) {

	return new Promise((resolve,reject) => {
		db.collection("polls").findOne({_id:ObjectId(id)},function(err,res) {
			if(res) {
				let poll = res;
				poll.values = poll.values.map(x => {
					if(x.name==value){
						x.votes = x.votes + 1;
					}
					return x;
				});
				db.collection("polls").update({_id:ObjectId(id)},poll,function(err,res) {
					if(err) reject({ok:false,message:"Voting error: " + err});
					if(res) {
						resolve({ok:true,message:poll});
					}
				});
			}
		});
	})
}
function checkVotersByIp(id,ip) {
	return new Promise((resolve,reject) => {
		db.collection("voters").findOne({_id:ObjectId(id)},function(err,res) {
			let voters = res && res.voters || [];
			let output = voters.filter(function(v){ return v==ip;});
			if(output.length) {
				reject({ok:false,message:"You cannot vote more than once "});
			}
			else {
				voters.push(ip);
				if(!res) res = {};
				if(!res.voters) res.voters = {};
				res.voters = voters;
				db.collection("voters").update({_id:ObjectId(id)},res, {upsert: true}, function(err,res){
					if(res) {
						resolve({ok:true,message:res});
					}
				});
			}
		});
	});
}
