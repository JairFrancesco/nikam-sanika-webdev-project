(function() {
    angular
        .module("Foodster")
        .controller("AdminController", AdminController);

        function AdminController($location,$routeParams,AdminService,UserService,RestaurantService){
        	var vm = this;

        	function init(){
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

            var allUsersPromise = AdminService.findAllRegisteredUsers();
            var reviewsList = [];
            allUsersPromise
            	.success(function(users){
            		if(users){
            			console.log("Found users");
            			console.log(users);
            			vm.users = users;
                        for(var u in users){
                            AdminService.findAllCustomerReviews(users[u]._id)
                                .success(function(reviews){
                                    for(var r in reviews){
                                        RestaurantService.findReviewById(reviews[r]._id)
                                            .success(function(review){
                                                reviewsList.push(review);
                                            })
                                            .error(function(){
                                                console.log("Could not find single review");
                                            });
                                    }
                                })
                                .error(function(){
                                    console.log("Could not find customer review array");
                                });
                        }
                        vm.reviews = reviewsList;
            		}
            	})
            	.error(function(){
                    console.log("Could not find a user too");
            	});

            /*var allReviewsPromise = AdminService.findAllCustomerReviews(vm.user.role);

            allReviewsPromise
            	.success(function(reviews){
                    console.log(reviews);
            		if(reviews){
            			console.log("Found reviews");
            			console.log(reviews);
            			vm.reviews = reviews;
            		}
            	})
            	.error(function(){
                    console.log("review list eror");
            	});*/


        	}
        	init();

        	vm.deleteUser = deleteUser;

        	function deleteUser(userId){

        		var userDeletePromise = AdminService.deleteUser(userId);

        		userDeletePromise
        			.success(function(response){
                        console.log(response);
        				if(response == 'OK'){
        					$location.url("/admin/" + userId);
        				}
        				else{
        					console.log("could not delete");
        				}
        			})
        			.error(function(){

        			});


        	}

        	vm.logout = logout;
        	function logout(){
            UserService.logout()
                .success(function(){
                    //$rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

        }
 })();