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
    https = require('https');,
    express = require('express'),
    fs = require('fs');

//Logger Initialization
logger.init();

//Initialize buffer
var buffer = channels_obj.buffer_init();

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

// We need this to build our post string
var querystring = require('querystring');

// Your login credentials
var username = 'MyUsername';
var apikey   = 'MyApiKey';

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
		    var jsObject = JSON.parse(chunk);
		    var messages = jsObject.SMSMessageData.Messages;
		    if ( messages.length > 0 ) {
				for (var i = 0; i < messages.length; ++i ) {
				    var logStr  = 'from=' + messages[i].from;
				    logStr     += ';message=' + messages[i].text;

				    lastReceivedId_ = messages[i].id;
				}
				channels_obj.broadcast(logStr);
				// Recursively fetch messages
				fetchMessages(lastReceivedId_);
		    } 
		});
	});
    
    request.end();
    console.log('LastReceivedId: ' + lastReceivedId_);
}

var lastReceivedId = 0;
fetchMessages(lastReceivedId);