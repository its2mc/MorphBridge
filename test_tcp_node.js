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

//Nodejs implementation of a tcp server

// Import required Modules
var comms = require('morphbridge').comms,
    logger = require('morphbridge').logger,
    channels_obj = require('morphbridge').channels_obj,
    mainChannel = channels_obj.newChannel(),
    net = require('net'),
    HOST = '0.0.0.0',
    PORT = 9501;


//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
    //console.log('TCP node Received ZMQ message');
    //logger.logStat('TCP node Received ZMQ message');
    mainChannel.tcp_bcast(msg);
};

//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

// Create a Server
net.createServer(function(sock) {
	// Introductory Message
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    mainChannel.subscribe(sock);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        if(comms.transmit(data))
            console.log("Message Sent from: "+sock.remoteAddress);
    });
      
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        mainChannel.unsubscribe(sock);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
