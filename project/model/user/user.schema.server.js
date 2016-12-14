
module.exports = function(){


var mongoose = require('mongoose');

//var WebsiteSchema = require("../website/website.schema.server.js");

var UserSchema = mongoose.Schema({
	fullName : String,
	username : String,
	password : String,
	imageUrl : String,
	about : String,
	email : String,
	phone :String,
	facebook : {
		id : String,
		token : String,
		email:String

	},
	query:String,
	role:{type:String, default:'CUSTOMER',enum: ['ADMIN','CUSTOMER']},
	reviews : [{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}],
	followers : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
	following : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}], //--> ref should be name of the model we declare
	dateCreated : {type : Date, default: Date.now()}
}, {collection : 'user'});

	return UserSchema;

};

