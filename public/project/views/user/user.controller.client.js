(function() {
    angular
        .module("Foodster")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("HomepageController", HomepageController)
        .controller("SearchController", SearchController)
        .controller("ProfileController", ProfileController);


    function LoginController($location,$rootScope,UserService) {
    	var vm = this;
        vm.login = login;
        function login(username,password){

            var promise = UserService.login(username,password);
                promise
                .success(function(user){
                    if(user === '0'){
                        vm.alert = "No such user";
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("user/" + user._id);
                    }
                })
                .error(function(){

                });
            //var promise = UserService.findUserByCredentials(username,password);
           /* if(username == null){
                if(password == null){
                    vm.alert = "Username and password are required";
                }else{
                    vm.alert = "Username is required";
                }
             }else if(password == null){
                vm.alert = "Password is required";
             }else{
                var promise = UserService.login(username,password);
                promise
                .success(function(user){
                    if(user === '0'){
                        vm.alert = "No such user";
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("user/" + user._id);
                    }
                })
                .error(function(){

                });
             }*/
           }
    }

    function RegisterController($location,$rootScope,UserService) {
    	var vm = this;
        vm.register = register;

        console.log('reached register controller');

        function register(user){
           //console.log(user);
           /* if(user == undefined){
                vm.alert = "Please enter the minimum data required";
            }
            if(user.username == null){
                if(user.password == null){
                    if(user.confirmPassword == null){
                        vm.alert = "Username and Password and verify password are required";
                    }
                    else{
                        vm.alert = "Username and password are required";
                    }
                }else{
                    vm.alert = "Username is required";
                }
            }else if (user.username == null){
                vm.alert = "Username is required";
            }
            else if(user.password == null){
                vm.alert = "Password is required";
            }else if(user.confirmPassword == null){
                vm.alert = "Verify password is required";
            }else if (user.password != user.confirmPassword){
                if(user.username == null){
                    vm.alert ="Username is required";
                }else{
                    vm.alert = "Password and Verify password must match";
                }
                
            }
            else{*/
               UserService.register(user)
                .success(function(user){
                    $rootScope.currentUser = user;
                    $location.url("/homepage/"+ user._id);
                }); 
           // }

        }

        
    }



    function ProfileController($routeParams,$location,UserService,RestaurantService) {
    	var vm = this;
        vm.logout = logout;
        var userId = $routeParams.uid;

       // vm.userId = $routeParams.uid;
        function init() {
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

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(){
            // UserService.updateUser(userId,user);
            // vm.user = UserService.findUserById(userId);
            //console.log("In user controller");
            //console.log(userId + user);
            var promise = UserService.updateUser(vm.user);
            promise
                .success(function(user){
                    if(user != '0'){
                        console.log("form update controller tests");
                       // console.log(user);
                        //vm.user = user;
                        console.log(user);
                        $location.url("profile/" + vm.user._id);

                    }
                    
                })
                .error(function(){

                });
            
        }

        function deleteUser(){
            // console.log("in delete user controler");
            // UserService.deleteUser(userId);
            // $location.url("/login");
            var promise = UserService.deleteUser(vm.user._id);

            promise
                .success(function(response){
                    console.log(typeof (response));
                    console.log(response);
                    if(response == 'OK'){
                        $location.url("/login");
                    }
                })
                .error(function(){

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

    function HomepageController($routeParams,$location,UserService){
    	var vm = this;
    	vm.search = search;

    	function init() {
           // vm.user = UserService.findUserById(vm.userId);
           var promise = UserService.findCurrentUser();
           //.findUserById(vm.userId);
           promise
            .success(function(user){
                if(user != '0'){
                    //console.log(user);
                    vm.user = user;

                }
            })
            .error(function(){

            });
        }
        init();

    	function search(query){
    		$location.url('/search/'+query);
    	}
    }

    function SearchController($routeParams,$location,UserService){
    	var vm = this;
    	var query = $routeParams.query;
    	
    	vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.getRestaurantDetails = getRestaurantDetails;

    	function init() {
           // vm.user = UserService.findUserById(vm.userId);
           var promise = UserService.findCurrentUser();
           //.findUserById(vm.userId);
           promise
            .success(function(user){
                if(user != '0'){
                    //console.log(user);
                    vm.user = user;

                }
            })
            .error(function(){

            });

            var searchPromise = UserService.findRestaurantBySearchQuery(query);

    		searchPromise
    			.success(function(response){
    				if(response != '0'){
    					//console.log(response.restaurants.length);
    					vm.restaurants = response.restaurants;
    					console.log(vm.restaurants);
    					//$location.url("/search");
    				}
    			})
    			.error(function(){

    			});
        }
        init();

        function checkSafeImageUrl(url){
        	return $sce.trustAsResourceUrl(url);
        }

        function getRestaurantDetails(restaurantId){

            //console.log("inside get restaurant controller");
            $location.url("/restaurant/"+restaurantId);
        }

    	/*function search(query){
    		var searchPromise = UserService.findRestaurantBySearchQuery(query);

    		searchPromise
    			.success(function(response){
    				if(response != '0'){
    					console.log(response.restaurants.length);
    					vm.restaurants = response.restaurants;
    					console.log(vm.restaurants);
    					//$location.url("/search");
    				}
    			})
    			.error(function(){

    			});
    	}*/
    }

})();
