/**
 * @fileOverview The core of the server.
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('express-session');

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var User = {};

passport.use(new GoogleStrategy({
		clientID: "638564967803-dqv1j2cslm8ua6135fc8a4928hvmnpun.apps.googleusercontent.com",
		clientSecret: "sEgQ5dzMp1G0dwB-pZOMdPtw",
		callbackURL: "http://localhost:8000/auth/callback"
	},
	function (accessToken, refreshToken, profile, cb) {
		User[profile.id] = profile;
		return cb(undefined, User[profile.id]);
	}
));

var zoom = 1;
var index = -1;

server.listen(8000);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.use(express.static('dist/public'));
app.use(session({
	secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());



var id = 0;
var points = [];


function authenticationMiddleware() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/auth');
	}
}


app.get('/', authenticationMiddleware(), (req, res) => {
	res.sendfile(__dirname + '/dist/public/index.html');
});

app.get('/view', (req, res) => {
	res.sendfile(__dirname + "/dist/public/view.html");
});

app.get('/points', (req, res) => {
	res.json(points);
});

app.get('/auth',
	passport.authenticate('google', {
		scope: ['profile']
	}));

app.get('/whoami', authenticationMiddleware(), function (req, res) {
	res.json(req.user.displayName);
});

app.get('/auth/callback', passport.authenticate('google', {
	failureRedirect: '/login'
}), (req, res) => {
	res.redirect('/');
});

/** This returns a new identity */
app.get('/identity', (req, res) => {
	res.json(getNewIdentity());
});

app.get('/clear', (req, res) => {
	points = []; // clear canvas

	//reset identity
	zoom = 1;
	index = -1;

	io.emit("delete"); // tell clients to clear canvas
	res.redirect("/");
});

io.on('connection', (socket) => {

	socket.on("here", (wantsId) => {
		initialData = {};
		initialData.points = points;
		if (wantsId) initialData.ident = getNewIdentity();
		socket.emit('initialData', initialData);
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

function getNextZoom() {
	index++;

	if (index >= Math.pow(zoom, 2)) {
		index = 0;
		zoom *= 2;
	}
	return zoom;
}

function getNewIdentity() {
	console.log("Spitting out new id");
	return {
		zoom: getNextZoom(),
		index: index,
		id: Math.random()
	}
}
