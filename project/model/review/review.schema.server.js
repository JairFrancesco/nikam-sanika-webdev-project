module.exports = function(){

	var mongoose = require('mongoose');

	var ReviewSchema = mongoose.Schema({
		review : {type:String},
		_user : {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel'},
		dateCreated : {type : Date, default: Date.now()},
		createdBy: {type:String},
		//restaurant : {type : mongoose.Schema.Types.ObjectId, ref : 'RestaurantModel'}
		restaurant : {type:String}, //name of the restaurant reviewed
		_restaurant : {type : mongoose.Schema.Types.ObjectId, ref : 'RestaurantModel'},
		role:{type:String, default:'CUSTOMER',enum: ['ADMIN','CUSTOMER']}

	},{collection : 'review'});

	return ReviewSchema;

};