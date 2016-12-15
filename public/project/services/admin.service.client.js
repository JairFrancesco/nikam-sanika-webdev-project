(function() {
    angular
      .module("Foodster")
      .factory("AdminService", AdminService);

      function AdminService($http){

      	var api = {
      		"findAllRegisteredUsers" : findAllRegisteredUsers,
      		"findAllReviews" : findAllReviews,
                  "deleteUser" : deleteUser
      	};

      	return api;

      	function findAllRegisteredUsers(){
      		var url = "/api/admin/users";
      		return $http.get(url);
      	}

      	function findAllReviews(){
      		var url = "/api/admin/reviews";
      		return $http.get(url);
      	}


            function deleteUser(userId){

                  var url = "/api/user/" + userId + "/delete";
                  return $http.delete(url);
            }

      }
 })();