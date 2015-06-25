/* 
* This work has been done by Phillip Ochola Makanyengo
* Email: its2uraps@gmail.com
*
* This work uses open source code and libraries and 
* can therefore be replicated unless certain portions
* are stated otherwise. 
*
* Please refer to the author when using the code.
*
*/

//Nodejs implementation of a http server

// Import required Modules
var comms = require('morphBridge').comms,
    logger = require('morphBridge').logger,
    channels_obj = require('morphBridge').channels_obj,
    zmq = require('morphBridge/node_modules/zmq'),
	pub = zmq.socket('pub');


//Logger Initialization
logger.init();

//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
    console.log('Received ZMQ message: '+ msg);
    //logger.logStat('Received ZMQ message: '+ msg);
    pub.send(msg);
};

//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

//if publisher already bound skip
pub.bind('tcp://*:2222', function(err) {
 	if(err)
    	console.log("Port already established: connecting...");
		//if not then connect to bound publisher
  	else
   		console.log("Listening on 8688...");
});