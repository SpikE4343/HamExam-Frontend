angular
  .module('app')
  .service('loginModal',
  function (
    $mdDialog,
    $rootScope,
    $templateCache) {

  function assignCurrentUser (user) {
    $rootScope.currentUser = user;
    return user;
  }

  return function(ev) {

    var instance = $mdDialog.show({
      controller: 'LoginDialogController',
      controllerAs: 'c',
      template: $templateCache.get('pages/dialog/login.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      escapeToClose:false,
      fullscreen: true // Only for -xs, -sm breakpoints.
    });

    return instance.then(assignCurrentUser);
  };

});
