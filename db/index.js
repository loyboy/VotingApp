var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");
var ObjectId = require('mongodb').ObjectID;

var db_name = process.env.Db_Name || 'voting-app';
var db_host = process.env.Db_Host || 'localhost';
var db_port = process.env.Db_Port || '27017';

var url = 'mongodb://'+db_host+':'+db_port;
var db = null;
var client = null;

MongoClient.connect(url, function(err, client) {
  if(err) console.log(err);
  db = client.db(db_name);
  client = client;
});

exports.user = {
	findUser,
	createUser
};

exports.poll = {
	createPoll,
	getMyPolls,
	deleteMyPoll,
	getPollById
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

function createPoll(poll) {
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