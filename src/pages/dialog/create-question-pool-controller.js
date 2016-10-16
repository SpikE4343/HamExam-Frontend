
angular.module('app')
       .controller('CreateQuestionPoolDialogController',
        ['$scope',
         'feathersService',
         '$mdDialog',
         '$window',
         'QuestionPoolParser',
         CreateQuestionPoolDialogController]);

function CreateQuestionPoolDialogController(
  $scope, feathersService, $mdDialog, $window, QuestionPoolParser) {
  service = feathersService.service('questionpools');
  var self = this;

  self.invalid = true;
  $scope.file = null;
  self.data = {
    name: '',
    tag: '',
    url: '',
    active:true
  };

  $scope.$watch('file', function() {
    if( $scope.file === null )
      return;

    if( self.data.name === '' )
      self.data.name = $scope.file.name.substring(
        0, $scope.file.name.lastIndexOf('.'));

    self.invalid = false;

    var fileReader = new $window.FileReader();

    fileReader.onload = function(){
      self.data.pool = btoa(unescape(encodeURIComponent(fileReader.result)));

      // QuestionPoolParser
      //   .parseFromTextString(fileReader.result)
      //   .subElements;
    };

    // read the file into memory
    fileReader.readAsText($scope.file);
  });

  self.cancel = function() {
    self.invalid = true;
    $mdDialog.cancel();
  };

  self.create = function() {
    // TODO: handle creation failure
    // TODO: show upload/processing progress
    //service.create( self.pool );
    console.log(self.data);

    self.invalid = true;
    $mdDialog.hide(self.data);
  };
}
