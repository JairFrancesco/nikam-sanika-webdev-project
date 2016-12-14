(function() {
	angular
		.module("Foodster")
		.controller("HotelController", HotelController);

		function HotelController($location,$routeParams,UserService,HotelService){
			console.log("Reached rest controller");
			var vm = this;
        	var restaurantId = $routeParams.rid;
            vm.createReview = createReviewByUser;


            function init() {
        	console.log("Reached rest controller");
        	
           // vm.user = UserService.findUserById(vm.userId);
           var promise = UserService.findCurrentUser();
           //.findUserById(vm.userId);
           promise
            .success(function(user){
                if(user != '0'){
                    console.log(user);
                    vm.user = user;

                }
            })
            .error(function(){

            });

            //to call the details service when the page loads

        	var restaurantPromise = HotelService.findRestaurantDetailsById(restaurantId);

        	restaurantPromise
        		.success(function(restaurant){
        			console.log(restaurant);
        			vm.restaurant = restaurant;

                    //store this restaurant in local DB
                    /*RestaurantService.createRestaurant(restaurant)
                        .success(function(response){
                            console.log(response);
                            if(response != 'OK'){
                                console.log("Inserted hotel successfully");
                            }
                        }) 
                        .error(function(){

                        });*/
        		})
        		.error(function(){

        		});
        	

           // var reviewsListPromise = RestaurantService.findAllReviews()

           }
           init();


           function createReviewByUser(userId,restaurantId,review){

                var reviewPromise = HotelService.createUserReview(userId,restaurantId,review);
                console.log("Reached reviews controller");
                reviewPromise
                    .success(function(response){
                        console.log("In promise success")
                        console.log(response);
                    })
                    .error(function(){
                        console.log("In error");
                    });
           }
		}
})();