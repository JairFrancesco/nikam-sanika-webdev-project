(function() {
    angular
      .module("WebAppMaker")
      .factory("UserService", UserService);


  function UserService($http) {
    var users = [
      {_id: "123", username: "alice",  email:"alice@gmail.com", password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
      {_id: "234", username: "bob",    email:"bob@gmail.com",  password: "bob",      firstName: "Bob",    lastName: "Marley"  },
      {_id: "345", username: "charly",  email:"charly@gmail.com", password: "charly",   firstName: "Charly", lastName: "Garcia"  },
      {_id: "456", username: "jannunzi", email:"jannunzi@gmail.com", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

	   var api = {
	     "createUser"   : createUser,
	     "findUserById" : findUserById,
       "findUserByUsername" : findUserByUsername,
       "findUserByCredentials" :findUserByCredentials,
       "updateUser" :updateUser,
       "deleteUser" : deleteUser,
       "login" :login,
       "checkLogin" : checkLogin,
       "logout" : logout,
       "register" : register,
       "findCurrentUser":findCurrentUser,
       "checkAdmin": checkAdmin,
	   };
    return api;


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
