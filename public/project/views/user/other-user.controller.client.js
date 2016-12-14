(function() {
    angular
        .module("Foodster")
        .controller("OtherUserController", OtherUserController);

        function OtherUserController($location,$routeParams,UserService,RestaurantService){
        	var vm = this;
        	var userId = $routeParams.uid;

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

            var userPromise = UserService.findUserById(userId);

            userPromise
            	.success(function(user){
            		if(user != '0'){

            		console.log("Found a user");
            		vm.otherUser = user;
            		if(vm.user._id == vm.otherUser._id){
            			console.log("SAME USER");
            			vm.otherUser.same="TRUE";

            		}else{
            			console.log("DIFF USER");
            			vm.otherUser.same="FALSE";
            		}

            		}
            		else{
            			console.log("Something went wrong");
            		}
            	})
            	.error(function(){

            	});

            var reviewListPromise = UserService.findReviewsForUser(userId);
            var reviewList = [];
            reviewListPromise
                .success(function(reviews){
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
                    console.log("Did not find reviews");
                });

        }
        init();
     }

})();