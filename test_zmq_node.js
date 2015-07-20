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
var comms = require('morphbridge').comms,
	logger = require('morphbridge').logger,
	channels_obj = require('morphbridge').channels_obj,
  zmq = require('zmq'),
	pub = zmq.socket('pub');


//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
    //console.log('ZMQ node received ZMQ message');
    //logger.logStat('ZMQ node received ZMQ message');
    pub.send(msg);
};

//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

//if publisher already bound skip
pub.bind('tcp://*:2030', function(err) {
 	if(err)
    	console.log("Port already established: connecting on 2030...");
		//if not then connect to bound publisher
  	else
   		console.log("Listening on 2030...");
});