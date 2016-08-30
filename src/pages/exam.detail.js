
angular
  .module('app')
  .controller('ExamDetailController',
    ['feathersService',
     '$scope',
     '$stateParams',
     ExamDetailController]);

function ExamDetailController(
  feathersService,
  $scope,
  $stateParams) {

  var self = this;
  var exams = feathersService.service('exams');

  self.dataLoaded = function(exam){
    self.exam = exam;
    $scope.$apply();
  };

  exams
    .on('updated', self.dataLoaded);

  exams
    .get($stateParams.id)
    .then(self.dataLoaded);
}
