Qt_webSocket_uri = "ws://localhost:2000"

function streamController($scope, qtInterfaceService)
{
	// scope constant vars and view functons
	$scope.isStreaming = true;
	$scope.buttonTexts = {'false' : "Start Stream!",'true' : "Stop Stream!"};


	// view manipulation functions
	function frameHandler(newFrame){
		$scope.currFrameData = newFrame;
		$scope.$apply();
	}

	$scope.flipStreamState = function(){
		$scope.isStreaming = !$scope.isStreaming;
		if ($scope.isStreaming)
			qtInterfaceService.startStream();
		else
			qtInterfaceService.stopStream();

	}


	//service area (init, signal watch, etc.)
	$scope.$on("qtservice.channel_open", function(){
		qtInterfaceService.registerHandler('videoStreamer', 'imageFrameReady', frameHandler);
	});

	qtInterfaceService.init(Qt_webSocket_uri);

}

angular.module('playerApp')
	.controller('streamController', ['$scope', 'qtInterfaceService', streamController]);

