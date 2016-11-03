// Main connection to backend host
//

angular
	.module('app')
	.service('feathersService', [
		'$q',
	function ($q) {
		var self = this;
    self.hostUrl = '';
    self.socket = null;
    // start up socket.io host connection
    self.connect = function( hostUrl ){
      self.hostUrl = hostUrl;
      if( self.socket !== null ){
        return;
			}

      self.socket = io(hostUrl);
      self.app =
        feathers()
          .configure(feathers.hooks())
          .configure(feathers.socketio(self.socket))
          .configure(feathers.authentication({
            storage: window.localStorage,
            cookie: 'hamexam-jwt'
          }))
          ;

      // self.app.authenticate({
      //   type: 'token',
      //   endpoint: '/auth/google'
      // }).then( function(result){
      //   console.log(result);
      //   console.log('token='+self.app.get('token'));
      // }).catch(function(error){
      //   console.error('Error authenticating!', error);
      // });
    //  console.log(self.app);
    };

    self.service = function( name ){
      return self.app.service(name);
    };

    self.connected = function(){
      return self.socket !== null;
    };

    self.loginValid = function() {
      return self.app.get('token') !== undefined;
    };

    self.authenticate = function(){
      self.app
          .authenticate()
          .then( function(result){
            console.log(result);
            console.log('token='+self.app.get('token'));
          }).catch(function(error){
            console.error('Error authenticating!', error);
          });
    };

		//if( process.env.NODE_ENV==='production')
		// TODO: data drive in some way. selectable?
    self.connect('http://hamexam.herokuapp.com');
    //self.connect('http://localhost:3030');
	}
]);
