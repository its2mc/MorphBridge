/* 
This is a bridging node for websocket transport.
*/

//Express is not necesary for this application.
var comms = require('morphBridge').comms,
	logger = require('morphBridge').logger,
	channels_obj = require('morphBridge').channels_obj,
	buffer = channels_obj.newBuffer(), 
	WebSocketServer = require('ws').Server,
	wsPort = 9093,
	ws = new WebSocketServer({port: wsPort}),
	host = (process.env.VCAP_APP_HOST || 'localhost');

//Logger Initialization
logger.init();

//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
	console.log('Received ZMQ message: '+ msg);
	//logger.logStat('Received ZMQ message: '+ msg);
};

//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

ws.on('connection', function (ws_sock) {
    ws_sock.on('message', function (message) {
  		console.log(message);
		if(comms.transmit(message))
			console.log("Message Sent");
//			logger.logStat("Message Sent");
    });
});
