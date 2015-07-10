/* 
This is a bridging node for websocket transport.
*/

//Express is not necesary for this application.
var comms = require('morphbridge').comms,
	logger = require('morphbridge').logger,
	channels_obj = require('morphbridge').channels_obj,
	buffer = channels_obj.newBuffer(), 
	WebSocketServer = require('ws').Server,
	wsPort = 9092,
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


//Function to recieve Messages from clients and translate into cloud commands If no commands then translator
//gives a console error and performs no function on the client side.
var translator = function(msg,userSock){
	var tempCmd = JSON.parse(msg);
	switch (tempCmd.command) {
		case "createChannel" : 
			try{
				if(channels[tempCmd.channelId] = channel(tempCmd.pass))	console.log("Channel Creation Successful\n");
				else console.log("Channel Already exists");
			}catch(e){
				console.log("Error Has occured during channel creation \n");
			}
		break;
		
		case "destroyChannel":
			try{
				for (var i in channels)
					if(i==tempCmd.channelId) channels.splice(i,1);
				console.log("Channel Destruction Successful\n");
			}catch(e){
				console.log("Error Has occured during channel destruction\n : "+e);
			}
		break;
		
		case "subscribe" : 
			try{
				if(channels[tempCmd.channelId].subscribe(userSock))	console.log("Subscription Successful\n");
				else throw "Subscriber Already Exists";
			}catch(e){
				console.log("Error Has occured during subscription\n" + e);
			}
		break;
		
		case "unsubscribe" : 
			try{
				channels[tempCmd.channelId].unsubscribe(userSock);
				console.log("Unsubscription Successful\n");
			}catch(e){
				console.log("Error Has occured during unsubscription\n"+e);
			}
		break;
		
		case "showStats" : 
			try{
				console.log(channels[tempCmd.channelId].stats());
			}catch(e){
				console.log("The following error occured\n"+e);
			}
		break;
		
		default:
			try{ 
				channels[tempCmd.channelId].broadcast(tempCmd.data);
			}catch(e){
				console.log("The following error occured\n"+e);
			}
		break;
	}
};

ws.on('connection', function (ws_sock) {
    ws_sock.on('message', function (message) {
  		console.log(message);
		if(comms.transmit(message))
			console.log("Message Sent");
    });
});
