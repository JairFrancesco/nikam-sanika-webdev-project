(function() {
    angular
      .module("Foodster")
      .factory("UserService", UserService);


  function UserService($http) {
   

	   var api = {
	     "register"   : register,
       "findCurrentUser":findCurrentUser,
       "findRestaurantBySearchQuery" :findRestaurantBySearchQuery
	    /* "findUserById" : findUserById,
       "findUserByUsername" : findUserByUsername,
       "findUserByCredentials" :findUserByCredentials,
       "updateUser" :updateUser,
       "deleteUser" : deleteUser,
       "login" :login,
       "checkLogin" : checkLogin,
       "logout" : logout,
       "register" : register,
       
       "checkAdmin": checkAdmin,*/
	   };
    return api;


  function findRestaurantBySearchQuery(query){
    var url = 'https://developers.zomato.com/api/v2.1/search?q='
              +query+'&apikey=dc3be5dcf2c4e2ad49f30f45c3930ee0';
    return $http.get(url);

 /* return $http({
       method:'GET',
       url: url,
       headers: {'accept':'application/json',
       'user_key' : 'dc3be5dcf2c4e2ad49f30f45c3930ee0'}
    });*/
  }

  function findCurrentUser(){
    var url = '/api/user';
    return $http.get(url);
  }

  function register(user){
    return $http.post("/api/register",user);
  }

  function logout(){
      return $http.post("/api/logout");
    }

  function checkLogin(){
    return $http.post("/api/checkLogin");
  }

  function checkAdmin() {
    return $http.post("/api/checkAdmin");
  }

  function login(username,password){
    var user = {
      username : username,
      password : password
    };

    return $http.post("/api/login",user);
  }

  function createUser(user) {
    
    return $http.post('/api/user',user);
      //users.push(user);
    
  }

  function findUserById(id) {
    var url = '/api/user/' +  id;
    return $http.get(url);
   
  }

  function findUserByUsername(username){
    var url = '/api/user?username=' + username;
    return $http.get(url);
  }

  function findUserByCredentials(username,password){

    var url  = '/api/user?username=' + username + '&password=' + password;
    return $http.get(url);

  }

  function updateUser(user){
    var url = "/api/user/" + user._id;
    return $http.put(url,user);
    
  }

  function deleteUser(userId){

    var url = "/api/user/" + userId;
    return $http.delete(url);

  
  }

  
}




})();
