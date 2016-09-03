
angular.module('app')
       .controller('QuestionPoolsController',
        ['feathersService',
         '$mdDialog',
         '$mdSidenav',
         '$scope',
         QuestionPoolsController]);

function QuestionPoolsController(
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

  self.questionpools = feathersService.service('questionpools');

  self.questionpools
    .on('created', function(pool){
      self.pools.data.push( pool );
      $scope.$apply();
    });

  self.questionpools
    .find()
    .then( function(pools) {
      self.pools = pools;
      self.loading = false;
      $scope.$apply();
    });
}
