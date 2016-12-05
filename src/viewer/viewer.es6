console.log("suhdude");

import Easel from '../easel.es6';
import R from 'ramda';
import Connection from '../server-interface.es6';
import Vue from "vue";
import Lens from "../lens.es6";

console.log("I am the viewer");

//Initialize vars
var L = new Lens();
var conn = new Connection(false);
var easel = new Easel("myCanvas");
var state = {
	mousedown: false,
	points: [],
	color: "red",
	ident: {
		zoom: 1,
		index: 0
	}
};

//Register connection callbacks
conn.onInitalDataRecived((ident, points) => {
	console.log('Recieved Identity', ident);
	var ident = state.ident;
	state.points = points;
	state.lens = L.multiplyBy(ident.zoom)
		.addX(ident.index % ident.zoom * easel.canvas.width * -1)
		.addY(Math.floor(ident.index / ident.zoom) * easel.canvas.height * -1);

	easel.drawPoints(points, state.lens);
});
conn.onPointRecived((point) => easel.drawPoint(point, state.lens));
conn.onPointRecived((point) => state.points.push(point));
conn.onDeleteRecived(() => easel.clear());

function redraw() {
	easel.clear();
	easel.drawPoints(state.points, state.lens);
}
