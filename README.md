The Morph Bridge application is meant to be an open source application that bridges communication over any and all (most) :D communication channels in existence.

The idea morphed from the bridge application that I developed on top. The bridge app bridged only websocket connections where as the morph bridge will be designed to bridge any communication protocol/channel available on nodejs.
For more info, read the App Description and Design document up top.  

<h2>Installation Instructions</h2>
<u>
	<li><b>1: </b>clone the git repo to your local repository. (git clone https://github.com/its2mc/morphBridge.git)</li>
	<li><b>2: </b>Install the morphbridge module (npm install morphbridge)</li>
	<li><b>3: </b>To test the platform do 
		<li><b>a: </b>Edit the ip address in the ajax get request to your servers ip "nano tests/static/http.html"</li>
		<li><b>b: </b>Run "node tests/server.js &"</li>
		<li><b>c: </b>Run "node http_node.js"</li>
		<li><b>d: </b>On your browser go to the following address. "http://your_server_ip:800". When the page loads press "load messages". If an empty bracket loads then the node works. If yout shoot me an email.^^ </li>
	</li>
</u>