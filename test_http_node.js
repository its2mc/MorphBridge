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
	url = require('url'),
	buffer = channels_obj.newBuffer(), //Buffer to store messages
	http = require('http');

//Optionally Set a limit to the buffer to limit the size
//buffer.setLimit(5); //This code limits the buffer to 20 messages

//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 

var handle = function(msg){
    //console.log('HTTP node received ZMQ message');
    //logger.logStat('HTTP node received ZMQ message');
    buffer.load(msg);
};

//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

// Create a Server
http.createServer(function (req, res) {
	console.log("We got another one!! \n");
	//Get data from request and commit to global pool
	var queryObject = url.parse(req.url,true).query;
	console.log(queryObject[0]);
	if (queryObject[0]) comms.transmit(queryObject[0]);
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://41.242.2.202:800'); //Change this ip to yours.. sry.. :D 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

	if (buffer.buffer.length > 0){
		//console.log(buffer.unload().toString());
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("'"+buffer.unload().toString()+"'");
	}
	else{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("No messages yet!");
	}
}).listen(8084);

process.on('SIGINT', function() {
  comms.close()
  console.log('\nClosed')
  process.exit();
});