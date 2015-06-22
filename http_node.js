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
	http = require('http'),
	fs = require('fs');

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

// Declare any variables/constants
var index = fs.readFileSync('web/index.html');

// Create a Server
http.createServer(function (req, res) {
  console.log("We got another one!! \n");
  
  //Format the response
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  //Give back the index file
  res.end(index);
}).listen(4050);