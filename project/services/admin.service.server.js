module.exports = function(app,model){
	app.get("/api/admin/users",findAllRegisteredUsers);
	app.get("/api/admin/reviews",findAllReviews);
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

	function findAllReviews(req,res){
		console.log(model);
		console.log("IN FIND ALL REVIEWS");
		model.reviewModel.findAllReviews()
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
				res.send(200);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

};