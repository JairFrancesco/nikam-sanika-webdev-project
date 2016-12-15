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
		findReviewsByUser :findReviewsByUser,
		followUser : followUser,
		findAllFollowers :findAllFollowers,
		findAllRegisteredUsers : findAllRegisteredUsers,
		deleteUserAndReviews : deleteUserAndReviews,
		setModel :setModel
};
	return api;

	function setModel(_model){
		model = _model;
	}

	function followUser(followerId,followingId){
		return UserModel.findById(followingId)
			.then(function(followingObj){
				return UserModel.findById(followerId)
					.then(function(followerObj){
						followingObj.followers.push(followerObj);
						followerObj.following.push(followingObj);
						followingObj.save();
						followerObj.save();
						return followingObj.save();
					},
					function(error){
						console.log("In follower error");
						console.log(error);
					})
			},
			function(error){
				console.log("in following error");
				console.log(error);
			})
	}

	function findAllFollowers(userId){
		return UserModel.findById(userId)
				.then(function(user){
					return user.followers;
				},
				function(error){
					console.log("Some thing wrong in model followers");
					console.log(error);
				})
	}

	function findAllRegisteredUsers(){
		return UserModel.find({
			'role' : 'CUSTOMER'
		});
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
			email :user.email,
			about : user.about,
			imageUrl : user.imageUrl
		});
	}

	function findUserByCredentials(username,password){
		return UserModel.findOne({
			username : username,
			password : password
		});
	}

	function findReviewsByUser(userId){
		return UserModel.findById(userId)
			.then(function(user){
				return user.reviews;
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

	function deleteUserAndReviews(userId){
		/*return UserModel.findById(userId)
			.then(function(userObj){
				model.
			})*/
	}

};