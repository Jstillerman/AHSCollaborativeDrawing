/**
 * @fileOverview Holds and exports the {@link Lens} class.
 * @author <a href="mailto:jstillerman2019@spyponders.com">Jason Stillerman</a>
 * @version 0.1
 */

import R from "ramda";

/** Class representing a Lens */
class OtherLens {
	/**
	 * Creates a new lens
	 * @param {operation[]} [operations] - A list of objects that describe functions to transform a number (immutable)
	 * @param {operation} [operation] - An object that describes what kind of transformation function to use
	 */
	constructor(operations, operation) {
		this.operations = operations || [];
		if (operation) {
			this.operations.push(operation);
		}
	}

	add(number) {
		return new OtherLens(this.operations, {
			add: number
		});
	}

	/**
	 * Returns a new Lens that is identical to this but adds a number to the x value at the end of the process
	 * @param {number} number - The number to add to x
	 * @returns {Lens}
	 */
	addX(number) {
		if (number == 0 || number == -0) return this
		return new OtherLens(this.operations, {
			addX: number
		});
	}

	/**
	 * Returns a new Lens that is identical to this but adds a number to the y value at the end of the process
	 * @param {number} number - The number to add to y
	 * @returns {Lens}
	 */
	addY(number) {
			if (number == 0 || number == -0) return this
			return new OtherLens(this.operations, {
				addY: number
			});
		}
		/**
		 * Returns a new Lens that is identical to this but multiplies x, y, and r at the end of the process
		 * @param {number} number - The number to multiply x, y, and r by
		 * @returns {Lens}
		 */
	multiplyBy(number) {
		return new OtherLens(this.operations, {
			multiplyBy: number
		});
	}

	/**
	 * Transforms a point object using each operation in order of definition
	 * @param {Point} point - the point (in global coordinates) you wish to transform
	 * @returns {Point} - The point after undergoing the transformation
	 */
	apply(point) {
			var newPoint = JSON.parse(JSON.stringify(point)); //Copy without reference
			for (var i = 0; i < this.operations.length; i++) {
				if (this.operations[i].add) {
					newPoint.x = newPoint.x + this.operations[i].add;
					newPoint.y = newPoint.y + this.operations[i].add;
					newPoint.r = newPoint.r + this.operations[i].add;
				}
				if (this.operations[i].multiplyBy) {
					newPoint.x = newPoint.x * this.operations[i].multiplyBy;
					newPoint.y = newPoint.y * this.operations[i].multiplyBy;
					newPoint.r = newPoint.r * this.operations[i].multiplyBy;
				}

				if (this.operations[i].addX) {
					newPoint.x = newPoint.x + this.operations[i].addX;
				}

				if (this.operations[i].addY) {
					newPoint.y = newPoint.y + this.operations[i].addY;
				}
			}
			return newPoint;
		}
		/**
		 * Returns a new Lens that would undo the operation of this
		 * @returns {Lens}
		 */
	inverse() {
		//reverse the order of the operations
		var ops = [].concat(this.operations).reverse()

		//Make the operations the respective inverse
		return new OtherLens(ops.map((op) => {
			if (op.add) {
				return {
					add: -op.add
				}
			}
			if (op.multiplyBy) {
				return {
					multiplyBy: 1 / op.multiplyBy
				}
			}
			if (op.addX) {
				return {
					addX: -op.addX
				}
			}
			if (op.addY) {
				return {
					addY: -op.addY
				}
			}
		}));
	}

	/**
	 * A getter for inverse so you can do L.inverse.apply(...) instead of L.inverse().apply(...)
	 */
	get inv() {
		return this.inverse();
	}

}

export default OtherLens;
