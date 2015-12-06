
function qtInterfaceService(){
	this_qt = this;
    this_qt.initialized = false;


	// Initialization Check Decorator
    this_qt.initCheck_D = function(callbackFunc)
    {
    	return function(){
	    	if(!this_qt.initialized){
	    		console.error("Qt Service is not Initialized or has been closed.");
	    		return;
	    	}
	    	callbackFunc.apply(null, arguments);
	    }
    }

	this_qt.init = function(wsUri){
		// console.log(this_qt.initialized);
		if (this_qt.initialized){
			console.log("Already Initialized!");
		}
		else{
			console.log("initializing!");
			socket = new WebSocket(wsUri);

			socket.onclose = function(){
				this_qt.initialized = false;
				console.error("Connection closed");
			};

			socket.onerror = function(error){
				this_qt.initialized = false;
				console.error("Connection error: " + error);
			};

			socket.onopen = function(){
				this_qt.channel = new QWebChannel(socket, function(channel){
						this_qt.channel = channel;
	    				this_qt.initialized = true;
						console.log(this_qt.channel.objects);
				});
			}
		};
	}

	//method for sending echo.
	this_qt.echo = function(msg, callback){
			this_qt.channel.objects.videoStreamer.echo(msg, callback);
	};
	this_qt.echo = this_qt.initCheck_D(this_qt.echo);
}




angular.module('playerApp')
	.service('qtInterfaceService', [qtInterfaceService]);
