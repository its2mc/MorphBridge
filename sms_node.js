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
var http = require('http');
var fs = require('fs');

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


http.get("http://www.google.com/index.html", function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});