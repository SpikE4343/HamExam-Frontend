var app = angular
  .module('app', [
    'ui.router',
    'ngMaterial',
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
            controllerAs: 'c'
        })
        .state('exams', {
            //abstract: true,
            url: '/exams',
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
            controller: 'ExamsController',
            controllerAs: 'c'
        })
        .state('exampools', {
            //abstract: true,
            url: '/exampools',
            //templateUrl: 'pages/home.html',
            templateProvider: function($templateCache){
              // simplified, expecting that the cache is filled
              // there should be some checking... and async $http loading if not found
              var t = $templateCache.get('pages/exampools.html');
              return t;
            },
            controller: 'ExamPoolsController',
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
