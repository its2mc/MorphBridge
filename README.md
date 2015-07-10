The Morph Bridge application is meant to be an open source application that bridges communication over any and all (most) :D communication channels in existence.

The idea morphed from the bridge application that I developed on top. The bridge app bridged only websocket connections where as the morph bridge will be designed to bridge any communication protocol/channel available on nodejs.
For more info, read the App Description and Design document up top.  

<h2>Installation Instructions</h2>
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