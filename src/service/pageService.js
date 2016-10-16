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
      controllerAs: 'c',
			showOnHomePage: false
    },{
      name: 'Question Pools',
      icon: 'question_answer',
      uiRoute: 'questionpools.list',
      template: 'pages/questionpools.html',
      controller: 'ExamsController',
      controllerAs: 'c',
			showOnHomePage: true
    },{
      name: 'Exams',
      icon: 'assignment',
      uiRoute: 'exams.list',
      template: 'pages/exams.html',
      controller: 'ExamsController',
      controllerAs: 'c',
			showOnHomePage: true
    }];
	}
]);
