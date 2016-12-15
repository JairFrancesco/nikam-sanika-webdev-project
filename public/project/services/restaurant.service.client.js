(function() {
    angular
      .module("Foodster")
      .factory("RestaurantService", RestaurantService);

      function RestaurantService($http){

      	var api = {
      		"findRestaurantDetailsById" : findRestaurantDetailsById,
          "createUserReview" : createUserReview,
          "createRestaurant" :createRestaurant,
          "findAllReviews" :findAllReviews,
          "findReviewById" :findReviewById,
          "findRestaurantDetails" : findRestaurantDetails
      	};
      	return api;
      	
      	function findRestaurantDetailsById(restaurantId){
      		var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='
              		+restaurantId+'&apikey=dc3be5dcf2c4e2ad49f30f45c3930ee0';

            return $http.get(url);
      	}

        function findRestaurantDetails(restaurantId){
          var url = "/api/restaurant/" + restaurantId;
          return $http.get(url);
        }
        function createUserReview(userId,restaurantId,review){

          var url = '/api/'+userId+'/'+restaurantId+'/review';
          var userReview ={
            'review' : review,
            //'restaurant' : restaurantName
          };
           console.log(url);
          return $http.post(url,userReview);
        }

        function createRestaurant(restaurant){
          console.log("inside create restaurant service call");
          var url = "/api/restaurant";
          var restaurantObj = {
            'name' : restaurant.name,
            'cuisine' :restaurant.cuisines,
            'locality' : restaurant.location.locality,
            'zomatoId' : restaurant.id,
            'address' : restaurant.location.address,
            'cost' : restaurant.average_cost_for_two,
            'imageUrl' : restaurant.thumb
          };

          return $http.post(url,restaurantObj);
        }

        function findAllReviews(restaurantId){
          var url ="/api/"+restaurantId+"/reviews";

          return $http.get(url);
        }

        function findReviewById(reviewId){
          var url = "/api/review/" + reviewId;
          return $http.get(url);
        }

      }

})();