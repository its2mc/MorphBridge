The Morph Bridge application is meant to be an open source application that bridges communication over any and all (most) :D communication channels in existence.

The idea morphed from the bridge application that I developed on top. The bridge app bridged only websocket connections where as the morph bridge will be designed to bridge any communication protocol/channel available on nodejs. Currently only works if the protocols are being run from the same machine. Working out how to have remote networks communicate to each other.
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
	<li>You can also run npm test and then run go ahead and run the test_http_node</li>
</u>

<h2>How to use morphbridge.</h2>
<p>
	To use morphbridge the only two lines you need to learn how to use are:
	<u>
		<li>comms.init(handle_function)</li>
		<li>comms.transmit(msg)</li>
	</u>
	Comms is the object created when the mesh network is established. The init function allows the node that is running it to communicate to other nodes in the localhost. The handle_function that is passed is mandatory since it handles messages that this node recieves. Although an error won't exactly happen, the messages need to be handled for safety. You can pass it to the logger. The transmit function sends a message to all the nodes that are running. The message can be binary/text e.t.c. JSON is nice.. Below is a sample script that shows how these can be implemented.
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
	Warning: Still under heavy development... Well the aim of the channels object was to allow for easy client. I had hope to implement methods such as client subscription, client removal, channel creation and deletion. This would allow you to register a client on a node to a certain channel and only have the client recieve messages from other channel clients. Clients would also be able to be removed from a channel when they close their connection or upon the evil wishes of the node master.. :D (thats you). However, as I developed this I realised that it was a bigger undertaking than I thought. I should actually develop it as a separate module.. In case there is a better substitute module, then don't require it. That said, I will give a basic rundown of the features I have implemented so far, or partially implemented. 
		<u>
			<li>channels_obj.createChannel / channelsobj.destroyChannel</li>
			<li>channels_obj.subscribe(client id)/channelsobj.unsubscribe(client id)</li>
			<li>channels_obj.newBuffer() -- Buffer object (Described below..)</li>
			<li>channels_obj.tcp_bcast -- TCP Broadcast</li>
			<li>channels_obj.websocket_bcast -- Websocket Broadcast</li>
			<li>channels_obj.setTimeout/checkTimeout/removeTimeout -- Timeout feature (not fully tested!!) </li>
			<li>channels_obj.translate (msg, client id)<br/>
			Well.. using this function, a client of a node can directly control channel creation/destruction/and broadcasting. This feature was to allow a device to autonomously control which devices it is communicating with... giving more autonomy to the network of iot devices.</li>
		</u>
</p>
<p>
	<h3>Logger</h3>
	<b>Warning: You have to create a logs folder in your base folder. Otherwise the nodes will not start.. working on a fix.. ㅠㅠ</b>
	The logger object is a simple winston based logger that is intended to make Logging easy and non blocking. The efficiency of the logger is determined by the winston logging module hence is subject to changes that the maintainers of the module make. That said to make it easy, I have masked the internal function of the winston logger so that you only need to know two functions from the logger object. i.e.
	<u>
		<li>logger.logStat(msg)</li>
		<li>logger.logErr(msg)</li>
	</u>
</p>
<p>
	<h3>Buffer</h3>
	This is a very simple buffer implementation that aims to accomodate non real time protocols/transports such as http post/get or sms. Be careful with the buffer as careless use can result in a runaway memory buildup. For the next morphbridge release I will set the preset limit of the buffer to 10 messages. However, if you would like to save more messages you can set the limit using the setLimit function I will list below. A fact worth noting, the buffer is emptied when a client queries for the stored messages. So it might not work if you have multiple asynchronous clients. It is a very basic buffer but it does its job well. That said, here are the functions exposed with the buffer object.
	<u>
		<li>buffer.load(msg) -- load a message to buffer.. order of messages entry might be confusing..:(</li>
		<li>buffer.unload() -- returns messages and empties buffer</li>
		<li>buffer.setLimit(int) -- sets an integer limit to the buffer size</li>
	</u>
</p>
