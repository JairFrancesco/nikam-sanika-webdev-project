(function() {
    angular
      .module("Foodster")
      .factory("AdminService", AdminService);

      function AdminService($http){

      	var api = {
      		"findAllRegisteredUsers" : findAllRegisteredUsers,
      		"findAllCustomerReviews" : findAllCustomerReviews,
                  "deleteUser" : deleteUser
      	};

      	return api;

      	function findAllRegisteredUsers(){
      		var url = "/api/admin/users";
      		return $http.get(url);
      	}

      	function findAllCustomerReviews(userId){
                  console.log("in find all reviews client service");
      		var url = "/api/"+userId+"/reviews";
      		return $http.get(url);
      	}


            function deleteUser(userId){
                  console.log("Entered delete uer client service with userId" + userId);
                  var url = "/api/user/" + userId + "/delete";
                  return $http.delete(url);
            }

      }
 })();