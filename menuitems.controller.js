(function () {
'use strict';

angular.module('MenuApp')
.controller("ItemsController",ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items){
var itemMenu = this;
itemMenu.menuItems=items;
}
})();
