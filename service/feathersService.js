// Main connection to backend host
//

angular
	.module('app')
	.service('feathersService', [
		'$q',
	function ($q) {
		self = this;
    self.hostUrl = '';
    self.socket = null;
    // start up socket.io host connection
    self.connect = function( hostUrl ){
      self.hostUrl = hostUrl;
      if( self.socket != null )
        return;

      self.socket = io(hostUrl);
      self.app = feathers()
          .configure(feathers.hooks())
          .configure(feathers.socketio(self.socket));

      console.log(self.app);
    };

    self.service = function( name ){
      return self.app.service(name);
    };

    self.connected = function(){
      return self.socket != null;
    };

		//if( process.env.NODE_ENV==='production')
    self.connect('http://hamexam.herokuapp.com');
	}
]);
