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