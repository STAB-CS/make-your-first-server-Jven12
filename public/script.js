// setInterval(function () {
// 	$.get("/number", function (value) {
// 		alert(value);
// 	});

// });
let prevMessages = [];

const hostname = '172.30.2.205.';

// SERVER SIDE ONLY!!!!!!!!!!!!!!!!!
// io.on('connection', (socket) => {
	
// 	socket.emit("secret", ans);

// });
// change background color based on if color = 0 or 1
function changeBackground(color) {
	if(color = 0) {
 		Color = ("black");
 	} 
	if(color = 1) {
 		Color = ("white");
 	}
 $("body").css("background", Color);

  }
var Color;
//changeBackground('white') ;

const socket = io();
//
socket.on("secret", (message) => {
	//<li>Coffee</li>
	for(let i = 0; i < message.length; i++) {
	 $("#messageHistory").append("<li>"+ message[i].messages + "</li>");
	console.log (message[i]);
	//alert(message);
}
});
// when the button is clicked tell server
$("#lightbutton").click(() => {
	socket.emit("clicked");

});

$("#sendMessage").click(() => {
	socket.emit("sent",$("#message").val());
	$("#message").val()
	$("#messageHistory").append("<li>"+ #message + "</li>");
});

//window.addEventListener("load",function() { changeBackground('black') });
//when there is a change console log "it worked"
socket.on("change", (value) => {
	console.log("it worked");
 	changeBackground(value.status);
 	//console.log value
});