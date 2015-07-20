The Morph Bridge application is meant to be an open source application that bridges communication over any and all (most) :D communication channels in existence.

The idea morphed from the bridge application that I developed on top. The bridge app bridged only websocket connections where as the morph bridge will be designed to bridge any communication protocol/channel available on nodejs.
For more info, read the App Description and Design document up top.  

<h2>Prerequisites</h2>
<u>
	<li>Zero MQ Software: http://zeromq.org/intro:get-the-software</li>
</u>

<h2>Test Installation Instructions</h2>
<u>
	<li>clone the git repo to your local repository. (git clone https://github.com/its2mc/morphBridge.git)</li>
	<li>Install the morphbridge module (npm install morphbridge)</li>
	<li>To test the platform you can do:
	<ul>
		<li>Edit the ip address in the test http.html webpage at lines 13 and 26. "nano tests/res/http.html"</li>
		<li>Run "npm install express" You are free to install the required modules for your node.</li>
		<li>Run "node tests/server.js &"</li>
		<li>Run "node test_http_node.js"</li>
		<li>On your browser go to the following address. "http://your_server_ip:800". When the page loads press "load messages". If a "No messages yet!" message appears then the node works. Correspondingly your terminal should notify you that "We got another one" .If not then shoot me an email. ^^.  </li>
		<li>When running your nodes you can run it in the background. Will remove console.logging when the logging module is revamped</li>
	</ul>
	</li>
</u>

<h2>How to use morphbridge.</h2>
<p>
	To use morphbridge the only two lines you need to learn how to use are:
	<u>
		<li>comms.init(handle_function)</li>
		<li>comms.transmit(msg)</li>
	</u>
	The init function allows the node that is running it to communicate to other nodes in the localhost. The handle_function that is passed is mandatory since it handles messages that this node recieves. Although an error won't exactly happen, the messages need to be handled for safety. You can pass it to the logger. The transmit function sends a message to all the nodes that are running. The message can be binary/text e.t.c. JSON is nice.. Below is a sample script that shows how these can be implemented.
</p>
<p>
	
</p>
<p>
	I have also included some helper functions and objects to make it easier for people to use the module. The functions and objects are as follows:
	<u>
		<li>channels object</li>
		<li>logger</li>
		<li>buffer</li>
	</u>
</p>
<p>
	<h3>Channels Object</h3>

</p>
<p>
	<h3>Logger</h3>
	
</p>
<p>
	<h3>Buffer</h3>
	
</p>
<u>
	<li></li>
</u>