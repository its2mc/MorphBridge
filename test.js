var WebSocket = require('ws');
var wsPort = 9090;
var ws = new WebSocket('ws://localhost:'+ wsPort );

ws.on('open', function open() {

 	for(var i = 0; i< 10; i++)
 		ws.send("{5,0,'Hey'}");
});