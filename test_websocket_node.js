/* 
This is a bridging node for websocket transport.
*/

//Express is not necesary for this application.
var comms = require('morphbridge').comms,
	logger = require('morphbridge').logger,
	channels_obj = require('morphbridge').channels_obj,
	mainChannel = channels_obj.newChannel(),
	WebSocketServer = require('ws').Server,
	wsPort = 9090,
	ws = new WebSocketServer({port: wsPort}),
	host = (process.env.VCAP_APP_HOST || '0.0.0.0');

var ws_sock;

//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
	//console.log('Websocket node received ZMQ message');
	//logger.logStat('Websocket node received ZMQ message');
	//channels_obj.translate(msg); //Allows for clients to dynamically start new channels
	mainChannel.websocket_bcast(""+msg.toString('utf8')+"");
};

//Mesh Network Connection Initialization
comms.init(handle); //Pass message handling function to mesh network connection

ws.on('connection', function (ws_sock) {
	mainChannel.subscribe(ws_sock);
    ws_sock.on('message', function (message) {
  		//console.log(message);
		if(comms.transmit(message))
			console.log("Message Sent");
//			logger.logStat("Message Sent");
    });

    ws_sock.on('close',function (){
    	mainChannel.unsubscribe(ws_sock);
    });
});

process.on('SIGINT', function() {
  comms.close()
  console.log('\nClosed')
  process.exit();
});