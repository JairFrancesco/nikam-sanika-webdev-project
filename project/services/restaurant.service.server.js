module.exports = function(app,model){

	app.post('/api/:userId/:restId/review', createUserReview);
	app.post('/api/restaurant', createRestaurant);

	function createUserReview(req,res){

		var review = req.body;
		var userId = req.params.userId;
		var restaurantId = req.params.restId;

		console.log(review + " "+ userId+" "+restaurantId);
		console.log(model);

		model.reviewModel.createUserReview(userId,restaurantId,review)
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
				}
				else{
					model.restaurantModel.createRestaurant(restaurant)
						.then(function(restaurantObj){
						console.log(restaurantObj);
						res.json(restaurantObj);
					},
					function(error){
					res.sendStatus(400).send(error);
					});
				}
			},
			function(error){
				res.sendStatus(400).send(error);
			});

		

	}


};