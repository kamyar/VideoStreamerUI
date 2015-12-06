Qt_webSocket_uri = "ws://localhost:2000"

function streamController($scope, qtInterfaceService)
{
	// console.log("Hello World!", this.constructor.name);
	qtInterfaceService.init(Qt_webSocket_uri);

	function echoHandler(msg){
		console.log("Yuppy! They said:", msg);
	}

	$scope.echo = function(){
		qtInterfaceService.echo($scope.name, echoHandler);
	}
}

angular.module('playerApp')
	.controller('streamController', ['$scope', 'qtInterfaceService', streamController]);

