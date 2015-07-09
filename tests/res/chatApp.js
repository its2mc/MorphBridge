var readMsg = function (msg){
	var temp = JSON.parse(msg);
	return temp;
};

var wsUri = "ws://41.242.2.202:9090";
websocket = new WebSocket(wsUri);

$(function(){
	$("vidApp").attr("disabled:disabled");
	$("#join").click(function(){ 
		$("#board").html("Connecting to Websocket Server</br>");

	});
	
	websocket.onopen = function(evt) { 
		$("#board").html("Connected to Websocket Server</br>");
	}; 
	
	websocket.onclose = function(evt) { 
		$("#board").html("Connection to Websocket closed</br>");
	}; 
	
	websocket.onmessage = function(evt) { 
		var temp = readMsg(evt.data);
		if(temp.command){
			if(temp.command==="newUser") alert(temp.userIP)
			else $("#board").append(temp.id +">>>"+temp.msg+"</br>");
			
		}else{
			$("#board").append("Error!</br>");
		}
	}; 
	
	websocket.onerror = function(evt) { 
		$("#board").append("<p>Error:"+evt.data+"</p>");
	}; 

	$("#board").html("Chat app is starting.");
	
	$("#sendToAll").click(function(){
		var msg = $("#msg").val();	
		$("#board").append("You >>>"+msg+"</br>");
		var temp = '{5, 0,"'+msg+'"}';
		websocket.send(temp);	
	});
});

