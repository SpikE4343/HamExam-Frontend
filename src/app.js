var app = angular
  .module('app', [
    'ui.router',
    'ngCookies',
    'ngFileUpload',
    'ngMaterial',
    'ngMaterialSidemenu',
    'md.data.table',
    'templates'
  ]).config(
  function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    $urlRouterProvider.when('', '/home');
    $urlRouterProvider.when('/', '/home');

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            //abstract: true,
            url: '/home',
            //templateUrl: 'pages/home.html',
            templateProvider: function($templateCache){
              // simplified, expecting that the cache is filled
              // there should be some checking... and async $http loading if not found
              var t = $templateCache.get('pages/home.html');
              return t;
            },
            controller: 'HomeController',
            controllerAs: 'c',
            data: {
              requireLogin: true
            }
        })
        .state('loginsuccess', {
          url: '/loginsuccess',
          controller: function($state, $cookies, feathersService){
            console.log('cookie:'+$cookies.get('hamexam-jwt'));
            feathersService.authenticate();
            $state.go('home');
          }
        })
        .state('exams', {
          abstract: true,
          url: '/exams',

          // Note: abstract still needs a ui-view for its children to populate.
          // You can simply add it inline here.
          template: '<flex ui-view layout-fill />'
        })
        .state('exams.list', {
            //abstract: true,
            url: '/list',
            //templateUrl: 'pages/home.html',
            templateProvider: function($templateCache){
              // simplified, expecting that the cache is filled
              // there should be some checking... and async $http loading if not found
              var t = $templateCache.get('pages/exams.html');
              return t;
            },
            controller: 'ExamsController',
            controllerAs: 'c'
        })
        .state('exams.detail', {
            //abstract: true,
            url: '/:id',
            //templateUrl: 'pages/home.html',
            templateProvider: function($templateCache){
              // simplified, expecting that the cache is filled
              // there should be some checking... and async $http loading if not found
              var t = $templateCache.get('pages/exam.detail.html');
              return t;
            },
            controller: 'ExamDetailController',
            controllerAs: 'c'
        })
        .state('questionpools', {
          abstract: true,
          url: '/questionpools',

          resolve: {
            pools: function($q, feathersService ){
              var p = $q.defer();
              var service = feathersService.service('questionpools');
              service
                .find()
                .then(function(pools){
                  p.resolve(pools);
                  //$scope.$apply();
                });
              return p.promise;
            }
          },
          // Note: abstract still needs a ui-view for its children to populate.
          // You can simply add it inline here.
          template: '<flex ui-view layout-fill />'
        })
        .state('questionpools.list', {
            //abstract: true,
            url: '/list',
            //templateUrl: 'pages/home.html',
            templateProvider: function($templateCache){
              // simplified, expecting that the cache is filled
              // there should be some checking... and async $http loading if not found
              var t = $templateCache.get('pages/questionpools.html');
              return t;
            },

            controller: function($scope, pools, feathersService, $mdDialog, $templateCache){
              $scope.c = {'pools': pools};

              service = feathersService.service('questionpools');
              service.on('created', function(pool){
                $scope.c.pools.data.push( pool );
                $scope.$apply();
              });

              // service.on('removed', function(pool){
              //   $scope.c.pools.data.push( pool );
              // });

              $scope.showCreateDialog = function(ev) {
                $mdDialog.show({
                  controller: 'CreateQuestionPoolDialogController',
                  controllerAs: 'c',
                  template: $templateCache.get('pages/dialog/create-question-pool.html'),
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                  service.create( answer );
                }, function() {

                });
              };

              $scope.deletePool = function(pool){
                service.remove(pool._id);
              };

            },
            //controllerAs: 'c'
        })
        .state('questionpools.detail', {
            //abstract: true,
            url: '/{id}/{eleid:int}/{subid:int}',
            //templateUrl: 'pages/home.html',
            templateProvider: function($templateCache){
              // simplified, expecting that the cache is filled
              // there should be some checking... and async $http loading if not found
              var t = $templateCache.get('pages/questionpool.detail.html');
              return t;
            },
            controller: 'QuestionPoolDetailController',
            controllerAs: 'c'
        })
        ;


    $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        //.accentPalette('orange')
        //.primaryPalette('orange')
        //.dark()
        ;

    $mdThemingProvider
       .theme('docs-dark', 'default')
       .primaryPalette('yellow')
       .dark();
});

app.controller("IndexPageController", [
   '$mdDialog',
   '$mdSidenav',
   '$scope',
   'pageService',
   function(
     $mdDialog,
     $mdSidenav,
     $scope,
     pageService) {
       var self = this;
       $scope.pages = pageService.pages;
       $scope.isNavDrawerOpen = function() {
         return $mdSidenav('nav').isOpen() ||
                $mdSidenav('nav').isLockedOpen();
       };

       $scope.isLockedOpen = function() {
         return $mdSidenav('nav').isLockedOpen();
       };

       $scope.toggleNavDrawer = function() {
         $mdSidenav('nav').toggle();
       };

       $scope.closeNavDrawer = function() {
         $mdSidenav('nav').close();
       };
   }

 ]);

 // app.js

app.run(function ($rootScope, $state, loginModal, feathersService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if( toState.data === undefined )
      return;
    var requireLogin = toState.data.requireLogin;
    var preventDisplay = toState.data.preventDisplay;

    if (requireLogin && !feathersService.loginValid() ) {
      if( preventDisplay )
        event.preventDefault();

       loginModal(event)
         .then(function () {
           return $state.go(toState.name, toParams);
         })
         .catch(function () {
           return $state.go('home');
         });
       }
   });
});
