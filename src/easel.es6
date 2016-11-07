/**
 * @fileOverview This holds and exports the {@link Easel} class
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */


/** Class representing an easel. */
class Easel {
	/**
	 * Create an easel
	 * @param {string} id - The id of the canvas to attach to.
	 */
	constructor(id) {
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');
		//width: fill parent
		this.canvas.style.width = '100%';
		this.canvas.width = this.canvas.offsetWidth;
		//TODO: Auto calc height
		this.canvas.height = this.canvas.width;
		this.canvas.style.background = '#f0f0f0';
	}

	/**
	 * Draws a point on the canvas
	 * @param {Point} point - the point to draw
	 * @param {Lens} lens - the lens to apply before the draw
	 */
	drawPoint(point, lens) {
			var scaled = lens.apply(point);
			this.ctx.fillStyle = scaled.color;
			this.ctx.beginPath();
			this.ctx.arc(scaled.x, scaled.y, scaled.r, 0, 2 * Math.PI, false);
			this.ctx.fill();
		}
		/**
		 * Draws an array of points on the canvas. This just calls {@link drawPoint} for each element.
		 * @param {Point[]} points - an array of points
		 * @param {Lens} lens - the lens to apply before the draw
		 */
	drawPoints(points, lens) {
			points.forEach((point) => this.drawPoint(point, lens));
		}
		/**
		 Clears the easel.
		 */
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

export default Easel
