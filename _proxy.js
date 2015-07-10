/*
This document serves as the proxy that allows for internode communication
*/
var zmq = require('morphbridge/node_modules/zmq'),
logger = require('morphbridge').logger,
publisher = zmq.socket('pub'),
subscriber = zmq.socket('sub'),
xsubSock = zmq.socket('xsub'),
xpubSock = zmq.socket('xpub'),
hwm = 1000,
verbose = 0,
pubListener = 'tcp://127.0.0.1:10001',
subListener = 'tcp://127.0.0.1:10002';

//Logger Initialization
logger.init();

xsubSock.identity = 'subscriber' + process.pid;

xsubSock.bindSync(pubListener,function(err){
	logger.logErr(err);
});

logger.logStat("X Publisher Listener Established");

// The xpub listener is where subs connect to
xpubSock.identity = 'publisher' + process.pid;
xpubSock.setsockopt(zmq.ZMQ_SNDHWM, hwm);
// By default xpub only signals new subscriptions
// Settings it to verbose = 1 , will signal on every new subscribe
xpubSock.setsockopt(zmq.ZMQ_XPUB_VERBOSE, verbose);
xpubSock.bindSync(subListener,function(err){
	logger.logErr(err);
});

logger.logStat("X Subscriber Listener Established"); 

// When we receive data on subSock , it means someone is publishing
xsubSock.on('message', function(data) {
// We just relay it to the pubSock, so subscribers can receive it
	xpubSock.send(data);
});
				 
// When Pubsock receives a message , it's subscribe requests
xpubSock.on('message', function(data, bla) {
	// The data is a slow Buffer
	// The first byte is the subscribe (1) /unsubscribe flag (0)
	var type = data[0]===0 ? 'unsubscribe' : 'subscribe';
	// The channel name is the rest of the buffer
	var channel = data.slice(1).toString();
	logger.logStat(type + ':' + channel);
	// We send it to subSock, so it knows to what channels to listen to
	xsubSock.send(data);
});