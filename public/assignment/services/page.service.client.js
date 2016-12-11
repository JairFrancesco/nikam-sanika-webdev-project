(function() {
    angular
      .module("WebAppMaker")
      .factory("PageService", PageService);


function PageService($http) {

  var pages = [
  { "_id": "321", "name": "Post 1", "websiteId": "456" ,"description": "Lorem"},
  { "_id": "432", "name": "Post 2", "websiteId": "456","description": "Lorem" },
  { "_id": "543", "name": "Post 3", "websiteId": "456","description": "Lorem" },
  { "_id": "323", "name": "Post 1", "websiteId": "234","description": "Lorem"},
  { "_id": "4322", "name": "Post 2", "websiteId": "678","description": "Lorem"},
  { "_id": "5431", "name": "Post 3", "websiteId": "234","description": "Lorem"},
  { "_id": "3221", "name": "Post 1", "websiteId": "567","description": "Lorem" },
  { "_id": "4312", "name": "Post 2", "websiteId": "789","description": "Lorem"},
  { "_id": "5453", "name": "Post 3", "websiteId": "567","description": "Lorem" }

];


	var api = {
	"createPage"   : createPage,
	"findPageById" : findPageById,
  "findPageByWebsiteId" : findPageByWebsiteId,
  "updatePage" :updatePage,
  "deletePage" : deletePage
	};
  return api;

  function createPage(websiteId,page) {
    var url = '/api/website/'+ websiteId + "/page";
    return $http.post(url,page);
    
  }

  function findPageByWebsiteId(websiteId) {
    var url = '/api/website/'+ websiteId + "/page";
    return $http.get(url);
  }

  function findPageById(pageId){
    var url = "/api/page/"+pageId;
    return $http.get(url);
  }

  function updatePage(pageId,page){

    var url = "/api/page/"+pageId;
    return $http.put(url,page);

   
  }

  function deletePage(pageId){
    var url = "/api/page/"+ pageId;
    return $http.delete(url);
   
  }

  
}




})();
