// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
// server.listen(3000);

const express = require('express');
const mustache = require('mustache-express');
const sqlite3 = require('sqlite3');

let light = 0;

const app = express();

let db = new sqlite3.Database("./file.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err)
		console.log(err);

	console.log("connected");
})
//db.run("CREATE TABLE messageHistory (messages TEXT);");
//db.run("INSERT INTO messageHistory VALUES ('message');")
 db.all("SELECT messages FROM messageHistory;", (err, ans) => {
	if (err)
		console.log(err);

	console.log(ans);

});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());

app.get("/", (req, res) => {
	res.render('home');
});

app.get("/number", (req, res) => { 
	//Math.floor((Math.random() * 100) + 1);
	res.end(light + "");
 });


//////////get ip when connected///////////////

// io.sockets.on('connection', function (socket) {
//   var address = socket.handshake.address;
//   console.log('PERSON HERE from ' + address.address + ':' + address.port);
// });
/////////////////////////////////
//when a person is connected the console will log PERSON HERE
io.on('connection', (socket) => {
	var address = socket.handshake.address;
  	console.log('PERSON HERE from ' + address.address + ':' + address.port);
	console.log("PERSON HERE");
	socket.emit("secret",);
	 db.all("SELECT messages FROM messageHistory;", (err, ans) => {
	if (err)
		console.log(err);

	socket.emit("secret", ans);

});
	//if the button is clicked then change emit a signal to change the background color
	socket.on("clicked", () => {
		if(light == 1) {
			light = 0
		} else {light = 1}
		io.emit("change", {
			status: light
		});
	});
	socket.on("sent", (message) => { 
		db.run("INSERT INTO messageHistory VALUES ('message');")
		let messageList = []
		io.emit("change", {
			
		});
	});
});




server.listen(8080, () => {
	console.log("server go vroom");
});
