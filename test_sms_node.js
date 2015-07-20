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
	buffer = channels_obj.newBuffer(), 
    http = require('http'),
    https = require('https');

//Optionally Set a limit to the buffer to limit the size
buffer.setLimit(5); //This code limits the buffer to 20 messages

//Handle internode messages
/*
Place your own function to handle messages recieved by the node.
*/ 
var handle = function(msg){
    //console.log('SMS node received ZMQ message');
	//logger.logStat('SMS node received ZMQ message');
	buffer.load(msg);
};


//Socket Initialisation
comms.init(handle); //Pass message handling function to sub_socket

// We need this to build our post string
var querystring = require('querystring');

// Your login credentials
var username = 'its2uraps';
var apikey   = 'bf5e56550abd9434eaf31fe26f22875f65b5d6afa4c6f1f01ddf896bc8a6d1a2';

function fetchMessages(lastReceivedId_) {
    // Build the post string from an object
    var options = {
		host: 'api.africastalking.com',
		port: '443',
		path: '/version1/messaging?username=' + username + '&lastReceivedId=' + lastReceivedId_,
		method: 'GET',
		
		rejectUnauthorized : false,
		requestCert        : true,
		agent              : false,
  
		headers: {
		    'Accept': 'application/json',
		    'apikey': apikey
		}
    };
    
    var request = https.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	    	
	    	
	    	//console.log(JSON.parse(chunk));
		    var jsObject = JSON.parse(chunk);
		    		    
		    var messages = jsObject.SMSMessageData.Messages;

		    if ( messages.length > 0 ) {
				for (var i = 0; i < messages.length; ++i ) {
				    var logStr  = 'from=' + messages[i].from;
				    logStr     += ';message=' + messages[i].text;
					console.log(logStr);
					comms.transmit(logStr);
				    lastReceivedId_ = messages[i].id;
				}
		    } 
		});
	});
    
    request.end();
    console.log('LastReceivedId: ' + lastReceivedId_);
    setTimeout(function(){ 
		fetchMessages(lastReceivedId); 
	}, 3000);
}

var lastReceivedId = 0;

setTimeout(function(){ 
	fetchMessages(lastReceivedId); 
}, 3000);
