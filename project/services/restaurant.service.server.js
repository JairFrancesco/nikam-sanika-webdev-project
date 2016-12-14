module.exports = function(app,model){

	app.post('/api/:userId/:restId/review', createUserReview);
	app.post('/api/restaurant', createRestaurant);
	app.get('/api/:restId/reviews', findAllReviews);
	app.get('/api/review/:reviewId',findReviewById);

	function createUserReview(req,res){

		var review = req.body;
		var userId = req.params.userId;
		//review.restaurant = req.params.restName;
		var restZomatoId = req.params.restId;

		console.log(review + " "+ userId+" "+review.restaurant);
		//console.log(model);

		model.reviewModel.createUserReview(userId,restZomatoId,review)
			.then(function(review){
				console.log("recahed service success");
				console.log(review);
				res.json(review);
				
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function createRestaurant(req,res){
		var restaurant = req.body;
		var zomatoId = restaurant.zomatoId;

		model.restaurantModel.findRestaurantByZomatoId(zomatoId)
			.then(function(restaurantObj){
				if(restaurantObj){
					res.send('OK');
					console.log("In success");
				}
				else{
					console.log("In else");
					return model.restaurantModel.createRestaurant(restaurant);
				}
			},
			function(error){
				res.sendStatus(400).send(error);
			})
			.then(function(restaurant){
				console.log("RESTAURANT SERVICE");
				res.json(restaurant);
			},
			function(error){
				res.sendStatus(400).send(error);
			});

		

	}

	function findAllReviews(req,res){
		var zomatoId = req.params.restId;
		var reviewList = [];
		model.restaurantModel.findReviewsForRestaurant(zomatoId)
			.then(function(reviewObject){
				console.log("IN REVIEW LIST SERVICE");
				console.log(reviewObject);
				/*for(var i in reviewObject){
					var reviewId = reviewObject[i];
					model.reviewModel.findById(reviewId)
						.then(function(review){
							console.log("LISTING ALL REVIEWS");
							console.log(review);
							reviewList.push(review);
						});
				}*/

				res.json(reviewObject);
			},
			function(error){
				console.log("IN REVIW LIST SERVICE ERROR");
				res.sendStatus(400).send(error);
			});
	}

	function findReviewById(req,res){
		var reviewId = req.params.reviewId;

		model.reviewModel.findReviewById(reviewId)
			.then(function(review){
				res.json(review);
			},
			function(error){
				res.sendStatus(400).send(error);
			})
	}

};