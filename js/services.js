
function qtInterfaceService($rootScope){
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
						$rootScope.$broadcast('qtservice.channel_open')
				});
			}
		};
	}

	//method for sending echo.
	startStream = function(callback){

			this_qt.channel.objects.videoStreamer.startStream();
	};
	this_qt.startStream = this_qt.initCheck_D(startStream);

	stopStream = function(callback){

			this_qt.channel.objects.videoStreamer.stopStream();
	};
	this_qt.stopStream = this_qt.initCheck_D(stopStream);



	//register handler for specific method of given endPoint(class)
	registerHandler = function(endPoint, signalName, signalHandler){
		this_qt.channel.objects[endPoint][signalName].connect(signalHandler);
	};
	this_qt.registerHandler = this_qt.initCheck_D(registerHandler);

}




angular.module('playerApp')
	.service('qtInterfaceService', ['$rootScope', qtInterfaceService]);
