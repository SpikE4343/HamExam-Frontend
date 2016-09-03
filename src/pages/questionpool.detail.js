
angular
  .module('app')
  .controller('QuestionPoolDetailController',
    ['feathersService',
     '$scope',
     '$stateParams',
     QuestionPoolDetailController]);

function QuestionPoolDetailController(
  feathersService,
  $scope,
  $stateParams) {

  var self = this;
  var exams = feathersService.service('questionpools');

  self.dataLoaded = function(pool){
    self.pool = pool;
    console.log(pool);
    $scope.$apply();
  };

  exams
    .on('updated', self.dataLoaded);

  exams
    .get($stateParams.id)
    .then(self.dataLoaded);
}
