/**
 * @fileOverview This connects all of the components for the client.
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */

//Imports
import Easel from './easel.es6';
import R from 'ramda';
import Connection from './server-interface.es6';
import EventSystem from './event-system.es6';
import Vue from "vue";
import Lens from "./lens.es6";

//Initialize vars
var conn = new Connection();
var easel = new Easel("myCanvas");
var events = new EventSystem(easel);
var state = {
	mousedown: false,
	lines: [],
	color: "red"
}

//Register mouse events
events.register("mousedown", () => state.mousedown = true);
events.register("mouseup", () => state.mousedown = false);
events.register("mousemove", handleMovement);

//Register connection callbacks
conn.onInitalDataRecived((ident, points) => {
	console.log('Recieved Identity', ident);
	state.ident = ident;
	state.lens = new Lens(easel, ident.index, ident.zoom, false);
	easel.drawPoints(points, state.lens);
});
conn.onPointRecived((point) => easel.drawPoint(point, state.lens));
conn.onDeleteRecived(() => easel.clear());


function handleMovement(evt) {
	if (state.mousedown) {
		var point = {
			x: evt.x,
			y: evt.y,
			r: 10,
			color: state.color
		}

		point = state.lens.inverse().apply(point);
		conn.sendPoint(point);
		easel.drawPoint(point, state.lens);
	}
}
// Vue initialization
var vm = new Vue({
	el: '#myApp',
	data: state,
	methods: {
		setColor: (color) => state.color = color
	}
});