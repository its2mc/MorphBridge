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
	buffer = channels_obj.newBuffer(), //Buffer to store messages
	http = require('http');

//Logger Initialization
logger.init();

//Optionally Set a limit to the buffer to limit the size
//buffer.setLimit(5); //This code limits the buffer to 20 messages

//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
    console.log('Received ZMQ message: '+ msg);
    logger.logStat('HTTP node received ZMQ message: '+ msg);
    //logger.logStat('Received ZMQ message: '+ msg);
    buffer.load(msg);
};

//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

// Create a Server
http.createServer(function (req, res) {
	console.log("We got another one!! \n");
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://41.242.2.202:800');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

	if (buffer.buffer.length > 0){
		console.log(buffer.unload().toString());
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("'"+buffer.unload().toString()+"'");
	}
	else{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("No messages yet!");
	}
}).listen(8084);