
angular.module('app')
       .controller('HomeController',
        ['feathersService',
         '$mdDialog',
         '$mdSidenav',
         '$scope',
         'pageService',
         HomeController]);

function HomeController(
  feathersService,
  $mdDialog,
  $mdSidenav,
  $scope,
  pageService) {

  var self = this;

  self.pages = pageService.pages;
  self.isNavDrawerOpen = function() {
    return $mdSidenav('nav').isOpen() ||
           $mdSidenav('nav').isLockedOpen();
  };

  self.isLockedOpen = function() {
    return $mdSidenav('nav').isLockedOpen();
  };

  self.toggleNavDrawer = function() {
    $mdSidenav('nav').toggle();
  };

  self.closeNavDrawer = function() {
    $mdSidenav('nav').close();
  };
}
