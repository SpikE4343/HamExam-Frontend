// All main pages
//

angular
	.module('app')
	.service('pageService', [
	function ($q) {
		var self = this;
    self.pages = [{
      name: 'Home',
      icon: '',
      url: '/home',
      template: 'pages/home.html',
      controller: 'HomeController',
      controllerAs: 'c'
    },{
      name: 'Exams',
      icon: 'list',
      url: '/exams',
      template: 'pages/exams.html',
      controller: 'ExamsController',
      controllerAs: 'c'
    }];
	}
]);
