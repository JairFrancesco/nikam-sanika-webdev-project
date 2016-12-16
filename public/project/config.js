(function(){
angular
	.module('Foodster')
	.config(Config);

	function Config($routeProvider,$httpProvider){
		$routeProvider
			.when('/login',{
			templateUrl : "/project/views/user/login.view.client.html",
			controller : "LoginController",
			controllerAs : "model"
			})
			.when('/admin/:uid',{
			templateUrl : "/project/views/admin/admin.view.client.html",
			controller : "AdminController",
			controllerAs : "model"
			/*resolve : {
				checkAdmin : checkAdmin
			}*/
			})
			.when('/homepage',{
			templateUrl : "/project/views/landing/landing.page.view.client.html",
			controller : "SearchController",
			controllerAs : "model"
			})
			.when('/homepage/:uid',{
			templateUrl : "/project/views/user/homepage.view.client.html",
			controller : "HomepageController",
			controllerAs : "model",
			resolve : {
				checkLogin: checkLogin
			}
			})
			.when('/register',{
			templateUrl : "/project/views/user/register.view.client.html",
			controller : "RegisterController",
			controllerAs : "model"
			})
			.when('/profile/:uid',{
			templateUrl : "/project/views/user/profile.view.client.html",
			controller : "ProfileController",
			controllerAs : "model"
			})
			.when('/search/:query',{
			templateUrl : "/project/views/hotel/hotel-search-list.view.html",
			controller : "SearchController",
			controllerAs : "model",
			resolve : {
				checkLogin: checkLogin
			}
			})
			.when('/restaurant/:rid',{
			templateUrl : "/project/views/hotel/restaurant-details.view.html",
			controller : "RestaurantController",
			controllerAs : "model"
			})
			.when('/restaurant/:rid/reviews',{
			templateUrl : "/project/views/hotel/reviews.view.html",
			controller : "RestaurantController",
			controllerAs : "model"
			})
			.when('/user/:uid/profile',{
			templateUrl : "/project/views/user/other-user-profile.view.client.html",
			controller : "OtherUserController",
			controllerAs : "model"
			})
			/*.when('/restaurant/:rid',{
			templateUrl : "/project/views/hotel/restaurant-details.view.html",
			controller : "HotelController",
			controllerAs : "model"
			})*/
			.when('/user/:uid',{
			templateUrl : "/project/views/user/update.profile.view.client.html",
			controller : "ProfileController",
			controllerAs : "model"
			/*resolve : {
				checkLogin: checkLogin
			}*/
			})
			.when('/user',{
			templateUrl : "/project/views/user/update.profile.view.client.html",
			controller : "ProfileController",
			controllerAs : "model"
			/*resolve : {
				checkLogin: checkLogin
			}*/
			})
			.otherwise({
			redirectTo : "/homepage"
		});

			function checkLogin($q, UserService, $location) {

            var deferred = $q.defer();

            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );

            return deferred.promise;
        }
	}


})();