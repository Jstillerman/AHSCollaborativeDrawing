/**
 * @fileOverview Holds and exports the {@link Lens} class.
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */

/** Class representing a Lens */
class Lens {
	/**
	 * Makes a Lens
	 * @param {Easel} easel - the easel that the lens will use for spacing
	 * @param {int} index - which chunk of the easel to zoom in on
	 * @param {float} zoom - how far in to zoom
	 * @param {boolean} [invert=false] - idek
	 */
	constructor(easel, index, zoom, invert = false) {
			this.invert = invert;
			this.easel = easel;
			this.index = index;
			this.zoom = zoom;
			this.x = (index % zoom) * (easel.canvas.width / zoom) * 2;
			this.y = Math.floor(index / zoom) * (easel.canvas.height / zoom) * 2;
			if (invert) {
				this.zoom = 1 / this.zoom;
			}
		}
		/**
		 * Applies transformation to given point
		 * @param {point} point - the point
		 * @returns {point} the transformed point
		 */
	apply(point) {
		var zoomedPoint = JSON.parse(JSON.stringify(point));
		if (this.invert) {
			zoomedPoint.x += -this.x;
			zoomedPoint.y += -this.y;
		}
		zoomedPoint.x *= this.zoom;
		zoomedPoint.y *= this.zoom;
		zoomedPoint.r *= this.zoom;

		if (!this.invert) {
			zoomedPoint.x += (this.invert ? this.x : -this.x);
			zoomedPoint.y += (this.invert ? this.y : -this.y);
		}
		return zoomedPoint;
	}

	empty() {
		return new Lens(this.easel, 0, 1);
	}

	inverse() {
		var lens = new Lens(this.easel, this.index, this.zoom, true);
		console.log(lens);
		return lens;
	}
}

export default Lens
