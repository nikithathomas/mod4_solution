(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider) {
  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'Categories.html',
    controller: 'CategoriesController as categ',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().then(function (items) {
        return items;
        });
      }]
    }
  })
  .state('itemMenu', {
    url: '/itemMenu/{itemName}',
    templateUrl: 'MenuItems.html',
    controller: 'ItemsController as itemMenu',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.itemName)
                .then(function (items) {
                  return items;
                });
            }]
    }
  });


}

})();
