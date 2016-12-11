(function() {
    angular
      .module("WebAppMaker")
      .factory("WebsiteService", WebsiteService);


function WebsiteService($http) {

  var websites = [
  { "_id": "123", "name": "Facebook",    "developerId": "456" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
  { "_id": "678", "name": "Checkers",    "developerId": "123" },
  { "_id": "789", "name": "Chess",       "developerId": "234" }
];


	var api = {
	"createWebsite"   : createWebsite,
	"findWebsiteById" : findWebsiteById,
  "findWebsiteByUser" : findWebsiteByUser,
  "updateWebsite" :updateWebsite,
  "deleteWebsite" : deleteWebsite
	};
  return api;

  function createWebsite(userId,website) {
      var url = "/api/user/"+userId+"/website";
      return $http.post(url,website);
  }

  function findWebsiteByUser(userId) {
    var url = "/api/user/"+userId+"/website";
    return $http.get(url);
  }

  function findWebsiteById(websiteId){
    var url = "/api/website/"+websiteId;
    return $http.get(url);
  }

  function updateWebsite(websiteId,website){
    var url = "/api/website/" + websiteId;
    return $http.put(url,website);
   
  }

  function deleteWebsite(websiteId){
    var url = "/api/website/"+ websiteId;
    return $http.delete(url);
    
  }

  
}




})();
