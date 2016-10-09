(function () {

	angular.module('data')
	.service('MenuDataService', MenuDataService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
	var service = this;
	var categories=[];
  var menuItems=[];
	service.getAllCategories = function () {
		return $http({method: "GET",url: (ApiBasePath + "/categories.json")}).then(function (response) {
      categories=response.data;
			return categories;
		});
	};
  service.getItemsForCategory=function(categoryShortName){
    return $http({method: "GET",url: (ApiBasePath + "/menu_items.json")}).then(function (response) {
			var returnedMenuItems=[];
      menuItems=response.data.menu_items;
			for(var i=0;i<menuItems.length;i++){
				if(menuItems[i].short_name.indexOf(categoryShortName)!=-1){
returnedMenuItems.push(menuItems[i]);
				}
			}
      return returnedMenuItems;
    });
  };

}
})();
