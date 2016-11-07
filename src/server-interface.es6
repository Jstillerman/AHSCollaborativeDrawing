/**
 * @fileOverview This holds the interface class, {@link Connection}, between client and server.
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback pointCallback
 * @param {Point} point
 */

import 'whatwg-fetch';
import io from './socket.io.js';

/**
 * Class that represents a connection to the server. This is responsible for bridging the gap between client/server
 */
class Connection {

	constructor() {
			this.socket = io.connect();
			console.log("Initialized Connection");

		}
		/**
		 * Registers a callback to handle the inital data sent from the server
		 * @param {function} callback - The function that will recive the inital data
		 */
	onInitalDataRecived(cb) {
		this.socket.on("initialData", (data) => {
			cb(data.ident, data.points);
		});
	}

	onDataRecived(cb) {
			this.socket.on("data", cb);
		}
		/**
		 * Registes a callback to handle new point sent from the server
		 * @param {pointCallback} callback - The function that will recive the data. The first arg is the point.
		 */
	onPointRecived(cb) {
			this.socket.on("point", cb);
		}
		/**
		 * Registers a callback to handle a "delete" event sent from the server. The callback probably clears the screen
		 * @param {function} callback - The function that deals with the delete event
		 */
	onDeleteRecived(cb) {
		this.socket.on("delete", cb);
	}

	/**
	 * Gets a new identity from the server
	 * @returns {Promise} promise - A promise that returns the new identity
	 */
	getIdentity() {
			return new Promise((resolve, reject) => {
				fetch('/identity')
					.then((response) => response.json())
					.then(resolve)
			});
		}
		/**
		 * Sends a point to the server
		 * @param {Point} point - the point to send to the server
		 */
	sendPoint(point) {
		this.socket.emit("point", point);
	}

}

export default Connection
