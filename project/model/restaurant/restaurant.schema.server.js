module.exports = function(){

	var mongoose = require('mongoose');

	var RestaurantSchema = mongoose.Schema({
		name : {type:String},
		cuisine : {type:String},
		zomatoId :{type : String},
		locality : {type:String},
		reviews : [{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}], 
		dateCreated : {type : Date, default: Date.now()},
		address : {type:String},
		cost : {type:String},
		imageUrl : {type:String}
		//createdBy: {type:String}
		//restaurant : {type : mongoose.Schema.Types.ObjectId, ref : 'RestaurantModel'},

	},{collection : 'restaurant'});

	return RestaurantSchema;

};