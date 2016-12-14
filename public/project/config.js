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
			.when('/homepage',{
			templateUrl : "/project/views/user/homepage.view.client.html",
			controller : "SearchController",
			controllerAs : "model"
			})
			.when('/homepage/:uid',{
			templateUrl : "/project/views/user/homepage.view.client.html",
			controller : "HomepageController",
			controllerAs : "model"
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
			controllerAs : "model"
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
			.otherwise({
			redirectTo : "/login"
		});
	}


})();