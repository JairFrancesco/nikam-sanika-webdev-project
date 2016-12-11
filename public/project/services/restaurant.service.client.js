(function() {
    angular
      .module("Foodster")
      .factory("RestaurantService", RestaurantService);

      function RestaurantService($http){

      	var api = {
      		"findRestaurantDetailsById" : findRestaurantDetailsById
      	};
      	return api;
      	
      	function findRestaurantDetailsById(restaurantId){
      		var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='
              		+restaurantId+'&apikey=dc3be5dcf2c4e2ad49f30f45c3930ee0';

            return $http.get(url);
      	}

      }

})();