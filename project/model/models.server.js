module.exports = function(){
	var mongoose = require ('mongoose');
	mongoose.connect('mongodb://localhost/foodster-fall-2016');
	//mongoose.connect('mongodb://sanikanikam:sanikanikam@ec2-54-211-101-168.compute-1.amazonaws.com:27017/dummyDB');
	var userModel = require("./user/user.model.server")();
	var reviewModel = require("./review/review.model.server")();
	var restaurantModel = require("./restaurant/restaurant.model.server")();
	// var widgetModel = require("./widget/widget.model.server")();


	var model ={
		userModel : userModel,
		reviewModel : reviewModel,
		restaurantModel :restaurantModel
		// widgetModel : widgetModel
	};

	
	userModel.setModel(model);
	reviewModel.setModel(model);
	restaurantModel.setModel(model);
	// widgetModel.setModel(model);

	return model;

	
};