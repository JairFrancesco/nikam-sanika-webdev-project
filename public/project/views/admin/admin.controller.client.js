(function() {
    angular
        .module("Foodster")
        .controller("AdminController", AdminController);

        function AdminController($location,$routeParams,AdminService,UserService){
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

            allUsersPromise
            	.success(function(users){
            		if(users){
            			console.log("Found users");
            			console.log(users);
            			vm.users = users;
            		}
            	})
            	.error(function(){

            	});

            var allReviewsPromise = AdminService.findAllReviews();

            allReviewsPromise
            	.success(function(reviews){
            		if(reviews){
            			console.log("Found reviews");
            			console.log(reviews);
            			vm.reviews = reviews;
            		}
            	})
            	.error(function(){

            	});


        	}
        	init();

        	vm.deleteUser = deleteUser;

        	function deleteUser(userId){

        		var userDeletePromise = AdminService.deleteUser(userId);

        		userDeletePromise
        			.success(function(response){
        				if(response != 'OK'){
        					$location.url("/admin");
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