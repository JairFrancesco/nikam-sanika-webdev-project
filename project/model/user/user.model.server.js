module.exports = function(){
	var model ={};
	var mongoose = require('mongoose');
	var UserSchema = require("./user.schema.server")();
	var UserModel  =  mongoose.model("UserModel",UserSchema);

	var api = {
		createUser : createUser,
		findUserById : findUserById,
		findUserByFacebookId :findUserByFacebookId,
		updateUser : updateUser,
		findUserByCredentials : findUserByCredentials,
		findUserByUsername : findUserByUsername,
		findWebsitesForUser : findWebsitesForUser,
		deleteUser :deleteUser,
		setModel :setModel
};
	return api;

	function setModel(_model){
		model = _model;
	}

	function createUser(user){
		return UserModel.create(user);
	}

	function findUserById(userId){
		//UserModel.find({_id : userId}); --> returns an array
		return UserModel.findById(userId);
	}

	function findUserByFacebookId(facebookId){
		return UserModel.findOne({
			"facebook.id" : facebookId
		});
	}

	function findUserByUsername(username){
		return UserModel.findOne({
			"username" : username
		});
	}

	function updateUser(userId,user){
		console.log(userId);
		console.log(user);
		return UserModel.update({
			_id: userId
		},
		{
			firstName : user.firstName,
			lastName : user.lastName,
			email :user.email
		});
	}

	function findUserByCredentials(username,password){
		return UserModel.findOne({
			username : username,
			password : password
		});
	}

	function findWebsitesForUser(userId){
		return UserModel.findById(userId)
						.then(function(user){
							return user.websites;
						});
	}

	function deleteUser(userId){
		return UserModel.remove({
			_id :userId
		});
	}

};