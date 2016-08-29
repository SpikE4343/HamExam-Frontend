
angular.module('app')
       .controller('ExamPoolsController',
        ['feathersService',
         '$mdDialog',
         '$mdSidenav',
         '$scope',
         ExamPoolsController]);

function ExamPoolsController(
  feathersService,
  $mdDialog,
  $mdSidenav,
  $scope) {

  var self = this;
  self.pools = {
    loading: true,
    total: 0,
    data:[]
  };

  var exampools = feathersService.service('questionpools');

  exampools
    .on('created', function(pool){
      self.pools.data.push( pool );
      $scope.$apply();
    });

  exampools
    .find()
    .then( function(pools) {
      self.pools = pools;
      self.loading = false;
      $scope.$apply();
    });
}
