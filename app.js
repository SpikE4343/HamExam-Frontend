var app = angular
  .module('app', [
    'ui.router',
    'ngMaterial',
    'md.data.table',
    'ngMdIcons'
  ]).config(
  ($stateProvider, $urlRouterProvider, $mdThemingProvider) => {

    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            //abstract: true,
            url: '/home',
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
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
})
