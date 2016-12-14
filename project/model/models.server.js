module.exports = function(){
	var mongoose = require ('mongoose');
	mongoose.connect('mongodb://localhost/foodster-fall-2016');
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