(function(){
	angular
		.module("wamDirectives",[])
		.directive("wamSortable",sortable);

		function sortable(){
			console.log("hello from sortable");
			function linker(scope,element,attributes){
				console.log("hello from linker");
				var start = -1;
				var end = -1;
					element.sortable({
					start : function(event,ui){
						start = $(ui.item).index();
					},
					stop : function(event,ui){
						end = $(ui.item).index();
						scope.sortableController.sort(start,end);
					}
					});
				
			}
			return{
				scope : {},
				restrict : 'C',
				link : linker,
				controller : sortableController,
				controllerAs : 'sortableController'

			}

			function sortableController($routeParams,WidgetService){
				var vm = this;
				vm.sort = sort;

				function sort(start,end){
					
					 WidgetService.sort($routeParams.pid,start,end);
					
				}
			}
		}
})();