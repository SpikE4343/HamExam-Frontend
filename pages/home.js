
angular.module('app')
       .controller('HomeController',
        ['feathersService',
         '$mdDialog',
         '$mdSidenav',
         '$scope',
         HomeController]);

function HomeController(
  feathersService,
  $mdDialog,
  $mdSidenav,
  $scope) {

  var self = this;
  self.techExams = {
    loading: true,
    total: 0,
    data:[]
  };

  var exams = feathersService.service('exams');
  console.log(exams);

  exams
    .on('created', exam => {
      self.techExams.data.push( exam );
      console.log(exam);
      $scope.$apply();
    });

  exams
    .find( { pool: 'tech'})
    .then( examList => {
      self.techExams = examList;
      self.loading = false;
      console.log(examList);
      $scope.$apply();
    });


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
