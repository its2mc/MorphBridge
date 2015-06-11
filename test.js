var WebSocket = require('ws');
var wsPort = 9090;
var ws = new WebSocket('ws://localhost:'+wsPort );

ws.on('open', function open() {
	var array = new Float32Array(5);

	for (var i = 0; i < array.length; ++i) {
		array[i] = i / 2;
	}
 	for(var i = 0; i< 10; i++)
 		ws.send(array, { binary: true, mask: true });
});