module.exports = function(app,model){
	app.get("/api/admin/users",findAllRegisteredUsers);
	app.get("/api/:userId/reviews",findAllCustomerReviews);
	app.delete("/api/user/:userId/delete",deleteUser);

	function findAllRegisteredUsers(req,res){
		model.userModel.findAllRegisteredUsers()
			.then(function(users){
				console.log("Found users for admin");
				console.log(users);
				res.json(users);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function findAllCustomerReviews(req,res){
		//console.log(model);
		console.log("IN FIND ALL REVIEWS");
		var userId = req.params.userId;
		model.reviewModel.findAllCustomerReviews(userId)
			.then(function(reviews){
				console.log("Found reviews for admin");
				console.log(reviews);
				res.json(reviews);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function deleteUser(req,res){

		var userId = req.params.userId;
		model.userModel.deleteUser(userId)
			.then(function(status){
		 		console.log("Entered delete uer sever service with status" + status);

				res.send("OK");
			},
			function(error){
				console.log("Entered delete uer sever service with error");
				res.sendStatus(400).send(error);
			});
	}

};