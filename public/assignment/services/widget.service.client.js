(function() {
    angular
      .module("WebAppMaker")
      .factory("WidgetService", WidgetService);


function WidgetService($http) {

 
	var api = {
	"createWidget"   : createWidget,
	"findWidgetById" : findWidgetById,
  "findWidgetByPageId" : findWidgetByPageId,
  "updateWidget" :updateWidget,
  "deleteWidget" : deleteWidget,
  "sort" : sort
	};
  return api;

  function sort(pageId,start,end){
    console.log("in sort client");
    console.log(pageId);
    var url  = "/api/page/" + pageId + "/widget?start=START&end=END";
    url = url.replace("START",start)
               .replace("END",end);

    $http.put(url);

  }

  function createWidget(pageId,widget) {
    var url = '/api/page/'+pageId+'/widget';
    return $http.post(url,widget);
    
  }

  function findWidgetByPageId(pageId) {
    var url = '/api/page/'+pageId+'/widget';
    return $http.get(url);
  }

  function findWidgetById(widgetId){
    var url = '/api/widget/'+widgetId;
    return $http.get(url);
  }

  function updateWidget(widgetId,widget){
    var url = '/api/widget/'+widgetId;
    return $http.put(url,widget);
   
  }

  function deleteWidget(widgetId){
    var url = '/api/widget/'+widgetId;
    return $http.delete(url);
  
  }

  
}




})();
