   /**
    * @fileOverview The core of the server.
    * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
    * @version 0.1
    */

   var express = require('express');
   var app = express();
   var server = require('http').Server(app);
   var io = require('socket.io')(server);

   server.listen(8000);

   app.use(express.static('dist/public'));

   var id = 0;
   var points = [];

   app.get('/', (req, res) => {
   	res.sendfile(__dirname + '/dist/public/index.html');
   });

   /** This returns a new identity */
   app.get('/identity', (req, res) => {
   	res.json(getNewIdentity());
   });

   app.get('/clear', (req, res) => {
   	points = []; // clear canvas
   	io.emit("delete"); // tell clients to clear canvas
   	res.redirect("/");
   });

   io.on('connection', (socket) => {
   	socket.emit('initialData', {
   		points: points,
   		ident: getNewIdentity()
   	});

   	socket.on("data", (data) => {
   		console.log("Recived Data", data);
   		socket.emit("data", data);
   	});
   	socket.on("point", (data) => {
   		points.push(data);
   		socket.broadcast.emit("point", data);
   	});
   });

   var zoom = 1;
   var index = -1;

   function getNextZoom() {
   	index++;

   	if (index >= Math.pow(zoom, 2)) {
   		index = 0;
   		zoom *= 2;
   	}
   	return zoom;
   }

   function getNewIdentity() {
   	return {
   		zoom: getNextZoom(),
   		index: index,
   		id: Math.random()
   	}
   }
