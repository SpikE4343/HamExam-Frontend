
angular.module('app')
       .controller('ExamsController',
        ['feathersService',
         '$mdDialog',
         '$mdSidenav',
         '$scope',
         ExamsController]);

function ExamsController(
  feathersService,
  $mdDialog,
  $mdSidenav,
  $scope) {

  var self = this;
  self.examList = {
    loading: true,
    total: 0,
    data:[]
  };

  var exams = feathersService.service('exams');

  exams
    .on('created', function(exam){
      self.examList.data.push( exam );
      $scope.$apply();
    });

  exams
    .find()
    .then( function(examList) {
      self.examList = examList;
      self.loading = false;
      $scope.$apply();
    });
}
