(function() {
    angular
        .module("Foodster")
        .controller("RestaurantController", RestaurantController);

        function RestaurantController($location,$routeParams,RestaurantService){

        	var vm = this;
        	var restaurantId = $routeParams.rid;
        	vm.getRestaurantDetails = getRestaurantDetails;

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

        	var promise = RestaurantService.findRestaurantDetailsById(restaurantId);

        	promise
        		.success(function(restaurant){
        			console.log(restaurant);
        			vm.restaurant = restaurant;

        		})
        		.error(function(){

        		});
        	

           }
           init();
        	

        	

        }

})();