// All main pages
//

angular
	.module('app')
	.service('pageService', [
	function ($q) {
		var self = this;
    self.pages = [{
      name: 'Home',
      icon: 'home',
      uiRoute: 'home',
      template: 'pages/home.html',
      controller: 'HomeController',
      controllerAs: 'c'
    },{
      name: 'Question Pools',
      icon: 'question_answer',
      uiRoute: 'exampools',
      template: 'pages/exampools.html',
      controller: 'ExamsController',
      controllerAs: 'c'
    },{
      name: 'Exams',
      icon: 'assignment',
      uiRoute: 'exams',
      template: 'pages/exams.html',
      controller: 'ExamsPoolsController',
      controllerAs: 'c'
    }];
	}
]);