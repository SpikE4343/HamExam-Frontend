
angular.module('app')
       .controller('LoginDialogController',
        ['$scope',
         'feathersService',
         '$mdDialog',
         '$window',
         LoginDialogController]);

function LoginDialogController(
  $scope, feathersService, $mdDialog, $window) {
  var self = this;
  self.authurl = feathersService.hostUrl + '/auth/google';
}
