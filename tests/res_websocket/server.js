/*
* Disclaimer and other stuff
*/

//Nodejs server for edison stream processor

var express = require('express'),
	path = require('path'),
	httpPort = 800,
	app = express();
	
	
//Set all environments
express.static.mime.default_type = "text/html"
 
app.use(express.static(path.join(__dirname, '/')))

//Start Server 
app.listen(httpPort, function(){
	console.log('HTTP Server: http://localhost:'+ httpPort)
});