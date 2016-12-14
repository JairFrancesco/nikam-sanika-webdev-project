module.exports = function(){
	var model ={};
	var mongoose = require('mongoose');
	var ReviewSchema = require ("./review.schema.server.js")();
	var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

	var api={
		setModel :setModel,
		createUserReview : createUserReview
	};
	return api;

	function setModel(_model){
		model = _model;
	}



	// function createUserReview(userId,restaurantId,review){
	// 	return ReviewModel.create(review)
	// 		.then(function(reviewObject){
	// 			console.log("in review success");
	// 			return model.userModel.findUserById(userId)
	// 				.then(function(userObject){
	// 					console.log(userObject);
	// 					userObject.reviews.push(reviewObject);
	// 					userObject.save();
	// 					reviewObject._user = userObject._id;
	// 					reviewObject.createdBy = userObject.fullName;
	// 					reviewObject.save();
	// 					return reviewObject.save();
	// 				},
	// 				function(error){
	// 					console.log("in user error");
	// 					console.log(error);
	// 				})
				
	// 		},
	// 		function(error){
	// 			console.log("in model review error");
	// 			console.log(error);
	// 		});
	// }

	function createUserReview(userId,restaurantId,review){
		return ReviewModel.create(review)
			.then(function(reviewObject){
				console.log("in review success");
				return model.userModel.findUserById(userId)
					.then(function(userObject){
						console.log(userObject);
						return model.restaurantModel.findRestaurantById(restaurantId)
								.then(function(restaurantObj){
									userObject.reviews.push(reviewObject);
									userObject.save();
									restaurantObj.reviews.push(reviewObject);
									restaurantObj.save();
									reviewObject._user = userObject._id;
									reviewObject.createdBy = userObject.fullName;
									reviewObject.restaurant = restaurantObj._id;
									reviewObject.save();
									return reviewObject.save();
								},
								function(error){
									console.log("in model restaurant error");
									console.log(error);
								});
						
					},
					function(error){
						console.log("in model user error");
						console.log(error);
					});
				
			},
			function(error){
				console.log("in model review error");
				console.log(error);
			});
	}

	
};