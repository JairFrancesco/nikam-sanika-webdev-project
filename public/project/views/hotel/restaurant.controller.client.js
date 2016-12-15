(function() {
    angular
        .module("Foodster")
        .controller("RestaurantController", RestaurantController);

        function RestaurantController($location,$routeParams,UserService,RestaurantService){
            console.log("Reached rest controller");
        	var vm = this;
        	var restaurantId = $routeParams.rid;
            vm.createReview = createReviewByUser;
            var restZomatoId = $routeParams.rid;
            vm.logout = logout;
            console.log(restaurantId);
        	//vm.getRestaurantDetails = getRestaurantDetails;

        	function init() {
        	console.log("Reached rest controller");
        	var restaurantName;
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
            var restaurantPromise;
            RestaurantService.findRestaurantDetails(restaurantId)
                .success(function(restaurant){
                    if(restaurant){
                        console.log("FOUND restaurant in DB");
                        vm.restaurant = restaurant;
                    }
                    else{
                        console.log("now calling zomato service");
                        restaurantPromise = RestaurantService.findRestaurantDetailsById(restaurantId);
                        restaurantPromise
                            .success(function(restaurant){
                                console.log(restaurant);
                                var restaurantObj = {
                                    'name' : restaurant.name,
                                    'cuisine' :restaurant.cuisines,
                                    'locality' : restaurant.location.locality,
                                    'zomatoId' : restaurant.id,
                                    'address' : restaurant.location.address,
                                    'cost' : restaurant.average_cost_for_two,
                                    'imageUrl' : restaurant.thumb
                                };
                                vm.restaurant = restaurantObj;
                                restaurantName = restaurant.name;
                                console.log("Inserted hotel");
                                //store this restaurant in local DB
                                RestaurantService.createRestaurant(restaurant)
                                    .success(function(response){
                                    console.log(response);
                                    if(response != 'OK'){
                                        console.log("Inserted hotel successfully");
                                    }
                                    else{
                                        console.log("Hotel already present");
                                    }
                                }) 
                                .error(function(){

                                });
                            })
                            .error(function(){

                            });
                    }
                })
                .error(function(){
                    console.log("SOMETHING WENT WRONG");
                });

        	/*var restaurantPromise = RestaurantService.findRestaurantDetailsById(restaurantId);

        	restaurantPromise
        		.success(function(restaurant){
        			console.log(restaurant);
        			vm.restaurant = restaurant;
                    restaurantName = restaurant.name;
                    console.log("Inserted hotel");
                    //store this restaurant in local DB
                    RestaurantService.createRestaurant(restaurant)
                        .success(function(response){
                            console.log(response);
                            if(response != 'OK'){
                                console.log("Inserted hotel successfully");
                            }
                            else{
                                console.log("Hotel already present");
                            }
                        }) 
                        .error(function(){

                        });
        		})
        		.error(function(){

        		});*/
        	
            var reviewListPromise = RestaurantService.findAllReviews(restZomatoId);
            var reviewList = [];
            reviewListPromise
                .success(function(reviews){
                    console.log("found reviews");
                    console.log(reviews);
                    for(var r in reviews){
                        RestaurantService.findReviewById(reviews[r])
                            .success(function(review){
                                console.log("found one review");
                                console.log(review);
                                reviewList.push(review);
                            })
                            .error(function(){
                                console.log("Something went wrong");
                            });
                    }

                    vm.reviewList = reviewList;
                })
                .error(function(){
                    console.log("Could not find reviews");
                });
           

           }
           init();
        	
        	
           function createReviewByUser(userId,restaurantId,review){

                var reviewPromise = RestaurantService.createUserReview(userId,restaurantId,review);
                console.log("Reached reviews controller");
                reviewPromise
                    .success(function(response){
                        console.log("In promise success")
                        console.log(response);
                        $location.url("/restaurant/" + restaurantId+ "/reviews");
                    })
                    .error(function(){
                        console.log("In error");
                    });
           }


           function logout(){
            UserService.logout()
                .success(function(){
                    //$rootScope.currentUser = null;
                    $location.url("/login");
                });
        }
    }

})();