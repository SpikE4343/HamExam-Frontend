
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

  self._id = $stateParams.id;
  self.eleid = $stateParams.eleid;
  self.subid = $stateParams.subid;

  self.dataLoaded = function(pool){
    self.pool = pool;
    console.log(pool);

    self.subelement = pool.subElements[self.eleid];
    self.section = self.subelement.sections[self.subid];
    $scope.$apply();
  };

  exams
    .on('updated', self.dataLoaded);

  exams
    .get(self._id )
    .then(self.dataLoaded);
}
