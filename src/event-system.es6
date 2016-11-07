/**
 * @fileOverview Manages user input. Exposes {@link EventSystem} class.
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */

/** A class that handles input from user */
class EventSystem {
	/**
	 * @constructor
	 * @param {Easel} easel - This is the easel that the eventlistener listens to
	 * @param {Boolean} [debug = false] - When this is true the events will be logged
	 */
	constructor(easel, debug = false) {
		this.canvas = easel.canvas;
		this.debug = debug;
	}
	register(event, cb) {
		this.canvas.addEventListener(event, (evt) => {
			if (this.debug) console.log(event, evt);
			var x = evt.clientX - this.canvas.offsetLeft + document.body.scrollLeft;
			var y = evt.clientY - this.canvas.offsetTop + document.body.scrollTop;
			cb({
				x: x,
				y: y
			});
		});
	}
}

export default EventSystem
